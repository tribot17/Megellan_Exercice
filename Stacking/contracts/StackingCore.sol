pragma solidity 0.8.19;

import {RWT} from "./RewardToken.sol";
//Il est important de modifier dans le dossier d'uniswap le IERC20 pour rajouter decimals()
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

//Import de l'aggregator de chainlink
interface AggregatorV3Interface {
    function decimals() external view returns (uint8);

    function description() external view returns (string memory);

    function version() external view returns (uint256);

    function getRoundData(
        uint80 _roundId
    )
        external
        view
        returns (
            uint80 roundId,
            int256 answer,
            uint256 startedAt,
            uint256 updatedAt,
            uint80 answeredInRound
        );

    function latestRoundData()
        external
        view
        returns (
            uint80 roundId,
            int256 answer,
            uint256 startedAt,
            uint256 updatedAt,
            uint80 answeredInRound
        );
}


/// @title StackingContract (Exerice)
/// @author Tristan Boettger
/// @notice Ce contract est un exercice, il n'est pas à utilisé en condition réel
contract StackingContract {
    //Permet de gérer les tokens qui n'ont pas la même fonction transferFrom
    using SafeERC20 for IERC20;
    
    //Rassemble toutes les informations de l'utilisateur dans une structure
    struct stackerStruct {
        uint256 balance;
        uint256 decimals;
        uint256 depositPrice;
        uint256 depositTime;
        uint256 reward;
    }

    //Créer une instance du contract de récompense
    RWT rewardToken;

    //L'address du price feed MATIC / USD sur mumbai 
    address matic_usd = 0xd0D5e3DB44DE05E9F294BB0a3bEEaF030DE24Ada;

    //Le pourcentage de récompense sur 1 année (36%)
    uint256 rewardRate = 36;

    //Rassemble toutes les address des tokens stacké par l'utilisateur
    mapping(address => address[]) userPositions;

    mapping(address => mapping(address => stackerStruct)) stacker;

    /// @dev Assigne à l'instance du contract l'adress du contract
    /// @param _rewardToken address du contract de récompense
    constructor(address _rewardToken) {
        rewardToken = RWT(_rewardToken);
    }


    /// @dev Permet de stacker des jetons ERC-20
    /// @param _tokenAddress adrress du token qui va être stacké
    /// @param _amount montant que l'utilisateur va stacker
    /// @param _aggregator address de la l'aggregator chainlink
    //Présente un risque de laisser l'accès a l'aggregator à l'utilisateur, car il pourrait indiquer celui qu'il veut et donc avoir un prix différent du token qu'il aurait déposé
    function stake(
        address _tokenAddress,
        uint256 _amount,
        address _aggregator
    ) public payable {
        uint256 tokenPrice;
        uint256 decimals;
        //Si l'appel à l'aggregator ne fonctionne pas on défini le prix à 1$ (10 ** 8 car c'est la decimals des réponses de chainlink)
        try this.getTokenPrice(_aggregator) returns (uint price) {
            tokenPrice = price;
        } catch {
            tokenPrice = 1 * 10 ** 8;
        }
        //Vérifie que l'utilisateur a bien approve le smart contract afin qu'il puisse utiliser la function transferFrom
        require(
            IERC20(_tokenAddress).allowance(msg.sender, address(this)) >=
                _amount,
            "no allowance"
        );
        //Défini les decimals du token par rapport au token utilisé
        decimals = IERC20(_tokenAddress).decimals();

        IERC20(_tokenAddress).safeTransferFrom(
            msg.sender,
            address(this),
            _amount
        );
        //Si l'utilisateur a déjà effectué un deposit, on va incrémenter sa balance et claim ses récompenses.
        //Le but étant de ne pas avoir a gérer plusieurs temporalités
        if (stacker[msg.sender][_tokenAddress].depositTime != 0) {
            _amount += stacker[msg.sender][_tokenAddress].balance;
            claimReward(_tokenAddress);
        } else {
            //Si l'utilisateur n'a jamais effectué de desposit on va ajouter l'address du token qu'il vient de stacker
            userPositions[msg.sender].push(_tokenAddress);
        }

        //Mise à jour de la structure par rapport à l'utilisateur mais aussi du token
        stacker[msg.sender][_tokenAddress] = stackerStruct(
            //Montant
            _amount,
            //Décimals du token
            decimals,
            //Prix du token
            tokenPrice,
            //Date du déposit
            block.timestamp,
            //Reward
            0
        );
    }

    /// @dev Permet de stacker des ETH / MATIC
    function stakeETH() public payable {
        require(msg.value > 0, "No funds");
        //Récupération du prix actuel du MATIC par rapport à l'USD via l'address qu'on a défini au début du contract
        (, int price, , , ) = AggregatorV3Interface(matic_usd)
            .latestRoundData();
        //Vérification que l'utilisateur n'a pas déjà déposé, par rapport à l'addres 0x000... qui sera l'address nous permettant d'identifier ETH ou MATIC 
        if (stacker[msg.sender][address(0)].depositTime == 0) {
            //Ajout dans cette address dans la liste des tokens
            userPositions[msg.sender].push(address(0));
        } else {
            //Si il a déjà déposé on appelle la fonction claim
            claimReward(address(0));
        }

        //Mise à jour des infos de l'utilisateur
        stacker[msg.sender][address(0)] = stackerStruct(
            stacker[msg.sender][address(0)].balance + msg.value,
            18,
            uint(price),
            block.timestamp,
            0
        );
    }

    /// @dev Récupère le prix par rapport à la pair de l'aggregator
    /// @param aggregatorAddress address de l'aggregator chainlink
    function getTokenPrice(
        address aggregatorAddress
    ) external view returns (uint) {
        (, int price, , , ) = AggregatorV3Interface(aggregatorAddress)
            .latestRoundData();
        return uint(price);
    }

    /// @dev Permet à l'utilisateur de retirer ses tokens
    /// @param _tokenAddress address du token qui va être retirer
    function withdrawToken(address _tokenAddress) public {
        uint balance = stacker[msg.sender][_tokenAddress].balance;
        require(balance > 0, "Balance too low");
        //Récupère les récompenses de l'utilisateur, sinon on risque d'avoir des erreurs dans le calcul par la suite
        claimReward(_tokenAddress);
        //Supprime le token de l'array stockant tous ses tokens déposés
        deleteArrayIndex(_tokenAddress, msg.sender);
        //Supprime toutes les infos de la structure
        delete stacker[msg.sender][_tokenAddress];
        //Transfère du smart contract à l'utilisateur
        IERC20(_tokenAddress).safeTransfer(msg.sender, balance);
    }

    /// @dev Permet à l'utilisateur de retirer ses ETH / MATIC
    function withdrawETH() public {
        uint balance = stacker[msg.sender][address(0)].balance;
        require(balance > 0);
        //Récupère les récompenses de l'utilisateur, sinon on risque d'avoir des erreurs dans le calcul par la suite
        claimReward(address(0));
        //Supprime toutes les infos de la structure
        deleteArrayIndex(address(0), msg.sender);
        //Transfère du smart contract à l'utilisateur
        delete stacker[msg.sender][address(0)];
        payable(msg.sender).transfer(balance);
    }

    /// @dev Supprime un index spécifique d'un array
    /// @param _value address qu'on va devoir trouver dans l'array des positions de l'utilisateur
    /// @param _user address de l'utilisateur
    function deleteArrayIndex(address _value, address _user) internal {
        //Storage => Memory
        uint256 length = userPositions[_user].length;
        address[] memory _userPositions = userPositions[_user];
        //Si l'array a un seul élément on le supprime directement
        if (length == 1) userPositions[_user].pop();
        else {
            //Sinon on vérifie tous éléments de cette array
            for (uint i = 0; i < length - 1; i++) {
                //Une fois qu'on est tombé dessus
                if (_userPositions[i] == _value) {
                    //On le déplace à la fin de l'array
                    userPositions[_user][i] = userPositions[_user][length - 1];
                    //Et on supprime le dernier index
                    userPositions[_user].pop();
                }
            }
        }
    }


    /// @dev Récupère les récompenses par rapport au token stacké
    /// @param _token address du token
    function claimReward(address _token) public {
        //Récupère la valeur de reward de l'utilisateur
        uint256 reward = getUpdatedReward(_token, msg.sender);
        require(reward > 0, "No reward");
        //Remet à 0 les informations de l'utilisateur
        stacker[msg.sender][_token].reward = 0;
        stacker[msg.sender][_token].depositTime = block.timestamp;
        //Mint les nouveaux tokens de récompense
        rewardToken.mint(reward, msg.sender);
    }

    /// @dev Calcul les récompenses de l'utilisateur
    /// @param _token address du token
    /// @param _user address de l'utilisateur
    function getUpdatedReward(
        address _token,
        address _user
    ) public view returns (uint256) {
        //On convertit la balance par rapport à leur valuer en $
        uint256 tokenAmount = convertToToken(
            stacker[_user][_token].balance,
            stacker[_user][_token].depositTime,
            stacker[_user][_token].decimals
        );
        //Calcul du nombre de seconds passés depuis le deposit de l'utilisateur
        uint daysPast = calculateDays(stacker[_user][_token].depositTime);
        //On retourne ensuite avec ces deux éléments le montant du à l'utilisateur
        return getInterest(tokenAmount, daysPast);
    }

    /// @dev Calcul nombre de second entre le deposit et maintenant
    /// @param _depositTime timestamp du moment du deposit
    function calculateDays(uint _depositTime) public view returns (uint) {
        //On soustrait le temps actuel par le timpestamp du moment du deposit
        return (block.timestamp - _depositTime);
    }

    /// @dev Converti le montant déposé en sa valeur en $
    /// @param _amount montant déposé
    /// @param _depositPrice prix au moment du deposit
    /// @param _decimals decimal du token a convertir
    function convertToToken(
        uint256 _amount,
        uint256 _depositPrice,
        uint256 _decimals
    ) internal pure returns (uint256) {
        //Soustrait à 18 le nombre de decimals du token
        uint decimalToAdd = 18 - _decimals;
        //On multiplie le montant déposé par l'utilisateur et son decimals pour le mettre sur la même unité que le prix du déposit (10 ** 18)
        //On multiplie le (token * 10 ** 18) et le (depositPrice * 10 ** 18) pour obtenir la valeur déposée par l'utilisateur
        return
            ((_amount * 10 ** decimalToAdd) * (_depositPrice * 10 ** 10)) /
            10 ** 18;
    }

    /// @dev Calcul la valeur que l'utilisateur peut réclamer
    /// @param _amount valeur du deposit de l'utilisateur
    /// @param _seconds nombre de secondes écoulées entre le deposit et maintenant
    function getInterest(
        uint _amount,
        uint _seconds
    ) internal view returns (uint) {
        //On prend 36% du la valeur desposit * le nombre de seconde écoulé et / par le nombre de secondes dans une année
        return ((((rewardRate * _amount) / 100) * _seconds) / 3.154e7);
    }

    /// @dev Retourne les informations sur la position par rapport au token et à l'utilisateur
    /// @param _token address du token
    /// @param _user address de l'utilsateur
    function getPosition(
        address _token,
        address _user
    ) public view returns (stackerStruct memory) {
        return stacker[_user][_token];
    }

    /// @dev Retourne toutes les address des tokens déposé par l'utilisateur
    /// @param _user address de l'utilisateur
    function getUserPosition(
        address _user
    ) public view returns (address[] memory) {
        return userPositions[_user];
    }
}

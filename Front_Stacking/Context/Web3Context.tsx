import { ethers } from "ethers";
import React, { createContext, useEffect, useState } from "react";
import { Spinner, useToast } from "@chakra-ui/react";
//Import la liste des aggregator
import { aggragatorList } from "../helpers/chainLinkAggregator";
const stackingContractABI = require("../ContractsABI/StackingContractABI.json");
const rewardTokenContractABI = require("../ContractsABI/RWT.json");
const ERC20ABI = require("../ContractsABI/ERC20ABI.json");
//Indication en dur des address du contract de Reward et de Stacking
const rewardTokenContractAddress = "0x830F2b1A1dc4082e9f30Dc5388434Fcc2C917b94";
const stackingContractAddress = "0x1D2931343A90267F5bFAFC8F47da38061055a202";

//Permet de créer l'interface du context
interface ContextProvider {
  children: any;
}

//Créer l'interface du context
interface web3Context {
  stakeETH: Function;
  getAllUserPositions: Function;
  getSpecificPositions: Function;
  stakeERC20: Function;
  getTokenSymbol: Function;
  updatedReward: Function;
  withdraw: Function;
  withdrawETH: Function;
  claimReward: Function;
  getTokenBalance: Function;
}

//Créer le context avec tous les éléments par défauts
export const Web3Context = createContext<web3Context>({
  stakeETH: () => {},
  getAllUserPositions: () => {},
  getSpecificPositions: () => {},
  stakeERC20: () => {},
  getTokenSymbol: () => {},
  updatedReward: () => {},
  withdraw: () => {},
  withdrawETH: () => {},
  claimReward: () => {},
  getTokenBalance: () => {},
});

//Permet d'éviter l'erreur avec l'objet window.ethereum
interface Window {
  ethereum?: any;
}

export const Web3ContextProivder: React.FC<ContextProvider> = ({
  children,
}) => {
  const [provider, setProvider] = useState<any>();
  const [stackingContract, setStackingContract] = useState<any>();
  const [rewardTokenContract, setRewardTokenContract] = useState<any>();
  const [signer, setSigner] = useState<any>();
  const [userAddress, setUserAddress] = useState("");
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    //Récupère toutes les informations de l'utilisateur à chaque rechargement du DOM
    loadData();
  }, []);

  const loadData = async () => {
    //Créer une nouvelle variable avec le type créer au préalable
    const windowEth: Window & typeof globalThis = window;
    //Créer un nouveau provider à partir de l'injected provider
    const _provider = new ethers.providers.Web3Provider(windowEth.ethereum);
    //Créer un signer à partir de l'injected du provider
    const _signer = _provider.getSigner();

    const _stackingContract = new ethers.Contract(
      stackingContractAddress,
      stackingContractABI,
      _provider
    );
    const _rewardTokenContract = new ethers.Contract(
      rewardTokenContractAddress,
      rewardTokenContractABI,
      _provider
    );

    //Vérification que l'utilisateur est bien connecté avant d'effectuer certaines opérations
    if (_signer._address) setUserAddress(await _signer.getAddress());
    else setProvider(_provider);
    setSigner(_signer);
    setStackingContract(_stackingContract);
    setRewardTokenContract(_rewardTokenContract);
    setLoading(false);
  };

  const stakeETH = async (amount: string) => {
    //Vérifie que l'utilisateur est bien connecté
    if (await isConnect()) {
      //Appelle la fonction stakeETH du smart contract à partir du signer et met la trace de la transaction dans une variable
      const tx = await stackingContract
        .connect(signer)
        .stakeETH({ value: ethers.utils.parseEther(amount) });
      //Appelle la fonction wait de la transaction afin de s'assurer que la transaction a bien été validée
      await tx.wait();
    }
  };

  const stakeERC20 = async (
    tokenAddress: string,
    userAddress: string,
    amount: string
  ) => {
    //Vérifie que l'utilisateur est bien connecté
    if (await isConnect()) {
      //Créer une nouvelle instance du contract du token appelé
      const ERC20Contract = new ethers.Contract(
        tokenAddress,
        ERC20ABI,
        provider
      );
      //Récupère les decimals et le symbol du token
      const decimals = await ERC20Contract.decimals();
      const symbol = await ERC20Contract.symbol();
      //Convertir le montant reçu par rapport aux decimals du token puis le convertir en string
      let amountToSend = (parseInt(amount) * 10 ** decimals).toString();
      let aggregator;
      //Récupère l'address de l'aggregator par rapport au symbol du token
      aggragatorList.map((x) => {
        const splitedPair = x.pair.split("/");
        const pairSymbol = splitedPair[0];
        //trim supprime les blancs au début de la string
        if (pairSymbol.trim() == symbol) aggregator = x.address;
      });

      //On récupère l'allowance de l'utilisateur (si l'utilisateur à approve cette allowance devrait avoir une certaine valeur)
      const allowance = await ERC20Contract.allowance(
        userAddress,
        stackingContractAddress
      );
      //On vérifie que l'allowance est bien supérieur à la somme qui doit être déposé sur le smart contract
      if (allowance < amountToSend) {
        //Si cette somme n'est pas supérieure on rappelle la fonction approve du token ERC20
        const approve = await ERC20Contract.connect(signer).approve(
          stackingContractAddress,
          amountToSend
        );
        //Appelle la fonction wait de la transaction afin de s'assurer que la transaction a bien été validée
        await approve.wait();
        //Envoie un message si la transction a bien été validé
        toast({
          title: "Token Approved",
          description: "You have approved the token",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      }
      //Appelle ensuite la fonction stake du smart contract
      const tx = await stackingContract
        .connect(signer)
        .stake(tokenAddress, amountToSend, aggregator);

      //Appelle la fonction wait de la transaction afin de s'assurer que la transaction a bien été validée
      await tx.wait();
    }
  };

  const withdraw = async (tokenAddress: string) => {
    //Créer une estimation du gas qui va être utilisé par la transaction
    const gasEstimate = await stackingContract
      .connect(signer)
      .estimateGas.withdrawToken(tokenAddress);
    //Apelle ensuite la fonction avec le gas estimé par la fonction estimateGas
    const tx = await stackingContract
      .connect(signer)
      .withdrawToken(tokenAddress, { gasLimit: gasEstimate });

    //Appelle la fonction wait de la transaction afin de s'assurer que la transaction a bien été validée
    await tx.wait();
  };

  const withdrawETH = async () => {
    const tx = await stackingContract.connect(signer).withdrawETH();
    await tx.wait();
  };

  const claimReward = async (tokenAddress: string) => {
    const tx = await stackingContract.connect(signer).claimReward(tokenAddress);
    await tx.wait();
  };

  const getTokenSymbol = async (tokenAddress: string) => {
    //Récupère le symbol d'un token par rapport à son address
    if (tokenAddress === "0x0000000000000000000000000000000000000000") {
      //On sait que l'address(0) va servir à identifier ETH / MATIC
      return "MATIC";
    } else {
      //Sinon on récupère le symbol par rapport à l'address du token
      const ERC20Contract = new ethers.Contract(
        tokenAddress,
        ERC20ABI,
        provider
      );
      //Retourne ensuite ce symbol
      return await ERC20Contract.symbol();
    }
  };

  const getAllUserPositions = async (address: string) => {
    //Récupère toutes les positions de l'utilisateur
    const userPosition = await stackingContract
      .connect(signer)
      .getUserPosition(address)
      .catch((err: any) => console.log(err));
    return userPosition;
  };

  const getSpecificPositions = async (
    userAddress: string,
    tokenAddress: string
  ) => {
    //Récupère les informations de la position de l'utilisateur par rapport à un token
    const userPosition = await stackingContract.getPosition(
      tokenAddress,
      userAddress
    );

    return userPosition;
  };

  const getTokenBalance = async (userAddress: string) => {
    //Récupère la balance de l'utilisateur en tokenReward
    const balance = await rewardTokenContract.balanceOf(userAddress);
    return balance;
  };

  const isConnect = async () => {
    //Vérifie que l'utilisateur a bien connecté son wallet
    const account = await provider.getSigner();
    if (await account.getAddress()) {
      setSigner(account);
      return account.getAddress();
    } else return false;
  };

  const updatedReward = async (tokenAddress: string, userAddress: string) => {
    //Récupère le montant que l'utilisateur peut réclamer afin de lui afficher en front
    const reward = await stackingContract.getUpdatedReward(
      tokenAddress,
      userAddress
    );
    return reward;
  };

  //Tant que les informations ne sont pas totalement récupéré on affiche un loader
  if (loading) return <Spinner />;

  return (
    <Web3Context.Provider
      //Retourne toutes les fonctions créer dans ce context afin qu'elles puissent être accessibles dans tout le projet
      value={{
        stakeETH,
        getAllUserPositions,
        getSpecificPositions,
        stakeERC20,
        getTokenSymbol,
        updatedReward,
        withdraw,
        withdrawETH,
        claimReward,
        getTokenBalance,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};

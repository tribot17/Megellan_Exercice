// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract RWT is ERC20, Ownable {
    address stackingContract;
    modifier onlyStackingContract() {
        require(msg.sender == stackingContract);
        _;
    }

    constructor() ERC20("Reward Token", "RWT") Ownable() {}

    //Défini l'address du contract de stacking
    function setContractAddress(address _contractAddress) public onlyOwner {
        stackingContract = _contractAddress;
    }

    //Mint des nouveaux tokens de récompenses
    function mint(uint _amount, address _user) public onlyStackingContract {
        _mint(_user, _amount);
    }
}

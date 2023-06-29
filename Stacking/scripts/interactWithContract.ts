import { ethers } from "hardhat";
require("dotenv").config();
const StackingContractABI = require("../artifacts/contracts/StackingCore.sol/StackingContract.json");
const RewardTokenABI = require("../artifacts/contracts/RewardToken.sol/RWT.json");
const ERC20ABI = [
  "constructor(uint256 initialSupply)",
  "event Approval(address indexed owner, address indexed spender, uint256 value)",
  "event Transfer(address indexed from, address indexed to, uint256 value)",
  "function allowance(address owner, address spender) view returns (uint256)",
  "function approve(address spender, uint256 amount) returns (bool)",
  "function balanceOf(address account) view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function decreaseAllowance(address spender, uint256 subtractedValue) returns (bool)",
  "function increaseAllowance(address spender, uint256 addedValue) returns (bool)",
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function totalSupply() view returns (uint256)",
  "function transfer(address to, uint256 amount) returns (bool)",
  "function transferFrom(address from, address to, uint256 amount) returns (bool)",
];
const linkUSDT = "0x1C2252aeeD50e0c9B64bDfF2735Ee3C932F5C408";
const chainLinkAddress = "0x326c977e6efc84e512bb9c30f76e30c160ed06fb";
const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545/");

const nonAddress = "0x0000000000000000000000000000000000000000";
const rewardTokenAddress = "0x14B88BcD3242A67050F452cc3644E4CAA9D32d97";
const stackingContractAddress = "0x431464cBE8a367684264c5a9DeE5ED630dC9b39D";

const wallet = new ethers.Wallet(`${process.env.PRIVATE_KEY}`);
const signer = wallet.connect(provider);

const rewardTokenContract = new ethers.Contract(
  rewardTokenAddress,
  RewardTokenABI.abi,
  provider
);

const stackingContract = new ethers.Contract(
  stackingContractAddress,
  StackingContractABI.abi,
  provider
);

async function depositETH() {
  const amount = ethers.utils.parseEther("1");
  const gasEstimate = await stackingContract.estimateGas.stakeETH({
    value: amount,
  });
  const tx = await stackingContract.connect(signer).stakeETH({
    value: amount,
    gasLimit: gasEstimate,
  });

  console.log(tx);
}

async function depositERC20(
  tokenAddress: string,
  aggregatorAddress: string,
  amount: any
) {
  const ERC20Contract = new ethers.Contract(tokenAddress, ERC20ABI);
  const approveGasEstimate = await ERC20Contract.connect(
    signer
  ).estimateGas.approve(stackingContract.address, amount);
  await ERC20Contract.connect(signer).approve(
    stackingContract.address,
    amount,
    { gasLimit: approveGasEstimate }
  );
  const depositGasEstimate = await stackingContract
    .connect(signer)
    .estimateGas.stake(tokenAddress, amount, aggregatorAddress);

  const tx = await stackingContract
    .connect(signer)
    .stake(tokenAddress, amount, aggregatorAddress, {
      gasLimit: depositGasEstimate,
    });
  console.log(tx);
}

async function getRewardValue(userAddress: string, token: string) {
  const rewardAmount = await stackingContract.getUpdatedReward(
    nonAddress,
    wallet.address
  );
  console.log(rewardAmount);
}

async function claimReward(token: string) {
  const gasEstimate = await stackingContract
    .connect(signer)
    .estimateGas.claimReward(token);

  const tx = await stackingContract
    .connect(signer)
    .claimReward(token, { gasLimit: gasEstimate });

  console.log(tx);

  console.log(await getRewardTokenBalance(signer.address));
}

async function getUserPosition(userAddress: string, token: string) {
  const userPosition = await stackingContract.getPosition(token, userAddress);
  console.log(userPosition);
}

async function getRewardTokenBalance(user: string) {
  const balance = await rewardTokenContract.balanceOf(user);
  console.log(balance);
}

async function setContractAddress() {
  await rewardTokenContract
    .connect(signer)
    .setContractAddress(stackingContractAddress);
}

const withdraw = async (tokenAddress: string) => {
  const gasEstimate = await stackingContract
    .connect(signer)
    .estimateGas.withdrawToken(tokenAddress);

  await stackingContract
    .connect(signer)
    .withdrawToken(tokenAddress, { gasLimit: gasEstimate });

  await getRewardTokenBalance(signer.address);
};

// depositETH();

// getUserPosition(wallet.address, nonAddress);

// getRewardValue(wallet.address, nonAddress);

// setContractAddress();

// claimReward(nonAddress);

// withdraw(chainLinkAddress);

// depositERC20(
//   "0x326C977E6efc84E512bB9C30f76E30c160eD06FB",
//   linkUSDT,
//   ethers.utils.parseEther("1")
// );

// claimReward(chainLinkAddress);

// getUserPosition(wallet.address, chainLinkAddress);

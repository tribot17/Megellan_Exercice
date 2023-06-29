import { ethers } from "hardhat";

async function main() {
  const RewardToken = await ethers.getContractFactory("RWT");
  const rewardToken = await RewardToken.deploy();

  await rewardToken.deployed();
  const StackingContract = await ethers.getContractFactory("StackingContract");
  const stackingContract = await StackingContract.deploy(rewardToken.address);

  await stackingContract.deployed();

  console.log(rewardToken.address, stackingContract.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

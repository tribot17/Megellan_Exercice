import { ethers } from "hardhat";
import { expect } from "chai";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { Bank } from "../typechain-types/Bank";

describe("Bank", function () {
  let index = 1;
  async function deployContract() {
    const [_owner, ..._otherAccounts] = await ethers.getSigners();
    const _BankContract = await ethers.getContractFactory("Bank");
    const _bankContract = await _BankContract.deploy();

    return { _bankContract, _owner, _otherAccounts };
  }

  describe("Deposit", function () {
    let BankContract: Bank;
    let owner: SignerWithAddress;
    let otherAccounts: SignerWithAddress[];

    before("Init Contract", async function () {
      const { _bankContract, _owner, _otherAccounts } = await deployContract();
      BankContract = _bankContract;
      owner = _owner;
      otherAccounts = _otherAccounts;
    });

    it(`${index++} : Should deposit 1 ether on the contract`, async function () {
      const ContractBalanceBefore = await ethers.provider.getBalance(
        BankContract.address
      );
      const UserBalanceBefore = await BankContract.balanceOf(owner.address);

      await BankContract.deposit({ value: ethers.utils.parseEther("1") });

      const UserBalanceAfter = await BankContract.balanceOf(owner.address);
      const ContractBalanceAfter = await ethers.provider.getBalance(
        BankContract.address
      );

      expect(ContractBalanceBefore).to.be.equal("0");
      expect(UserBalanceBefore).to.be.equal("0");
      expect(ContractBalanceAfter).to.be.equal(ethers.utils.parseEther("1"));
      expect(UserBalanceAfter).to.be.equal(ethers.utils.parseEther("1"));
    });

    it(`${index++} : Should emit deposited event`, async function () {
      await expect(
        BankContract.connect(owner).deposit({
          value: ethers.utils.parseEther("1"),
        })
      )
        .to.emit(BankContract, "deposited")
        .withArgs(owner.address, ethers.utils.parseEther("1"));
    });
  });

  describe("Withdraw", function () {
    let BankContract: Bank;
    let owner: SignerWithAddress;
    let otherAccounts: SignerWithAddress[];

    before("Init Contract", async function () {
      const { _bankContract, _owner, _otherAccounts } = await deployContract();
      BankContract = _bankContract;
      owner = _owner;
      otherAccounts = _otherAccounts;
      await BankContract.connect(owner).deposit({
        value: ethers.utils.parseEther("2"),
      });
    });

    it(`${index++} : Should withdraw 1 ether`, async function () {
      const ContractBalanceBefore = await ethers.provider.getBalance(
        BankContract.address
      );
      const UserBalanceBefore = await BankContract.balanceOf(owner.address);

      const ETHUserBalanceBefore = await ethers.provider.getBalance(
        owner.address
      );

      const tx = await BankContract.withdraw(ethers.utils.parseEther("1"));
      const receipt = await tx.wait();
      const gas = receipt.gasUsed.mul(receipt.effectiveGasPrice);

      const UserBalanceAfter = await BankContract.balanceOf(owner.address);
      const ContractBalanceAfter = await ethers.provider.getBalance(
        BankContract.address
      );
      const ETHUserBalanceAfter = await ethers.provider.getBalance(
        owner.address
      );
      expect(ContractBalanceBefore).to.be.equal(ethers.utils.parseEther("2"));
      expect(UserBalanceBefore).to.be.equal(ethers.utils.parseEther("2"));
      expect(ContractBalanceAfter).to.be.equal(ethers.utils.parseEther("1"));
      expect(UserBalanceAfter).to.be.equal(ethers.utils.parseEther("1"));
      expect(ETHUserBalanceAfter.add(gas)).to.be.equal(
        ETHUserBalanceBefore.add(ethers.utils.parseEther("1"))
      );
    });

    it(`${index++} : Should emit withdrawed event`, async function () {
      const amount = ethers.utils.parseEther("1");

      await expect(BankContract.connect(owner).withdraw(amount))
        .to.emit(BankContract, "withdrawed")
        .withArgs(owner.address, amount);
    });

    it(`${index++} : Should'nt withdraw funds cause not enought funds`, async function () {
      await expect(
        BankContract.connect(owner).withdraw(ethers.utils.parseEther("1"))
      ).to.be.revertedWith("Not enougth funds");
    });
  });
  describe("TransferTo", function () {
    let BankContract: Bank;
    let owner: SignerWithAddress;
    let otherAccounts: SignerWithAddress[];

    before("Init Contract", async function () {
      const { _bankContract, _owner, _otherAccounts } = await deployContract();
      BankContract = _bankContract;
      owner = _owner;
      otherAccounts = _otherAccounts;
      await BankContract.connect(owner).deposit({
        value: ethers.utils.parseEther("1"),
      });
    });

    it(`${index++} : Should transfer from owner to otherAccounts[0]`, async function () {
      const amount = ethers.utils.parseEther("1");
      const ContractBalanceBefore = await ethers.provider.getBalance(
        BankContract.address
      );
      const UserBalanceBefore = await BankContract.balanceOf(owner.address);
      const OtherAccountBalanceBefore = await ethers.provider.getBalance(
        otherAccounts[0].address
      );

      await BankContract.connect(owner).transferTo(
        otherAccounts[0].address,
        amount
      );

      const ContractBalanceAfter = await ethers.provider.getBalance(
        BankContract.address
      );
      const UserBalanceAfter = await BankContract.balanceOf(owner.address);
      const OtherAccountBalanceAfter = await ethers.provider.getBalance(
        otherAccounts[0].address
      );

      expect(ContractBalanceBefore).to.be.equal(amount);
      expect(UserBalanceBefore).to.be.equal(amount);
      expect(ContractBalanceAfter).to.be.equal("0");
      expect(UserBalanceAfter).to.be.equal("0");
      expect(OtherAccountBalanceAfter).to.be.equal(
        OtherAccountBalanceBefore.add(amount)
      );
    });

    it(`${index++} : Should'nt transferTo cause not enought funds`, async function () {
      await expect(
        BankContract.connect(owner).transferTo(
          otherAccounts[0].address,
          ethers.utils.parseEther("1")
        )
      ).to.be.revertedWith("Not enougth funds");
    });
  });

  describe("TransferTo", function () {
    let BankContract: Bank;
    let owner: SignerWithAddress;
    let otherAccounts: SignerWithAddress[];

    before("Init Contract", async function () {
      const { _bankContract, _owner, _otherAccounts } = await deployContract();
      BankContract = _bankContract;
      owner = _owner;
      otherAccounts = _otherAccounts;
    });

    it(`${index++} : Return owner's balance`, async function () {
      const UserBalance = await BankContract.balanceOf(owner.address);

      expect(UserBalance).to.be.equal("0");
    });

    it(`${index++} : Return owner's balance (1ether)`, async function () {
      const amount = ethers.utils.parseEther("1");
      await BankContract.connect(owner).deposit({
        value: amount,
      });
      const UserBalance = await BankContract.balanceOf(owner.address);

      expect(UserBalance).to.be.equal(amount);
    });
  });
});

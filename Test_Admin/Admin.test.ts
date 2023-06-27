import { ethers } from "hardhat";
import { expect } from "chai";
import { Admin } from "../typechain-types";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

describe("Admin", function () {
  let AdminContract: Admin;
  let owner: SignerWithAddress;
  let othersAccount: SignerWithAddress[];
  async function deployContract() {
    const [_owner, ..._othersAccounts] = await ethers.getSigners();
    const _AdminContract = await ethers.getContractFactory("Admin");
    const _adminContract = await _AdminContract.deploy();

    await _adminContract.deployed();

    return { _adminContract, _owner, _othersAccounts };
  }

  before("Init contract", async function () {
    const { _adminContract, _owner, _othersAccounts } = await deployContract();

    AdminContract = _adminContract;
    owner = _owner;
    othersAccount = _othersAccounts;
  });

  describe("Constructor Variable", function () {
    it("Admin should be equal to owner", async function () {
      expect(await AdminContract.admin()).to.be.equal(owner.address);
    });
  });

  describe("OnlyAdmin", function () {
    let OnlyAdminAdminContract: Admin;

    before("Init contract", async function () {
      const { _adminContract } = await deployContract();
      OnlyAdminAdminContract = _adminContract;
    });

    it("Admin should access to addToWhitelist", async function () {
      await expect(
        OnlyAdminAdminContract.connect(owner).addToWhitelist(
          othersAccount[0].address
        )
      ).to.not.be.rejected;
    });

    it("Admin should access to removeFromWhitelist", async function () {
      await expect(
        OnlyAdminAdminContract.connect(owner).removeFromWhitelist(
          othersAccount[0].address
        )
      ).to.not.be.rejected;
    });

    it("Admin should access to removeFromWhitelist", async function () {
      await expect(
        OnlyAdminAdminContract.connect(owner).addToBlacklist(
          othersAccount[0].address
        )
      ).to.not.be.rejected;
    });

    it("Admin should access to removeFromWhitelist", async function () {
      await expect(
        OnlyAdminAdminContract.connect(owner).removeFromBlacklist(
          othersAccount[0].address
        )
      ).to.not.be.rejected;
    });

    it("OtherAccount[0] should'nt access to addToWhitelist", async function () {
      await expect(
        OnlyAdminAdminContract.connect(othersAccount[0]).addToWhitelist(
          othersAccount[1].address
        )
      ).to.be.rejectedWith("Not admin");
    });

    it("OtherAccount[0] should'nt access to removeFromWhitelist", async function () {
      await expect(
        OnlyAdminAdminContract.connect(othersAccount[0]).removeFromWhitelist(
          othersAccount[1].address
        )
      ).to.be.rejectedWith("Not admin");
    });

    it("OtherAccount[0] should'nt access to removeFromWhitelist", async function () {
      await expect(
        OnlyAdminAdminContract.connect(othersAccount[0]).addToBlacklist(
          othersAccount[1].address
        )
      ).to.be.rejectedWith("Not admin");
    });

    it("OtherAccount[0] should'nt access to removeFromWhitelist", async function () {
      await expect(
        OnlyAdminAdminContract.connect(othersAccount[0]).removeFromBlacklist(
          othersAccount[1].address
        )
      ).to.be.rejectedWith("Not admin");
    });
  });

  describe("Whitelist", function () {
    let WhitelistAdminContract: Admin;

    before("Init contract", async function () {
      const { _adminContract } = await deployContract();
      WhitelistAdminContract = _adminContract;
    });

    it("Should add an address to the whitelist", async function () {
      const isWhitelistedBefore = await WhitelistAdminContract.isWhiteListed(
        othersAccount[0].address
      );
      await WhitelistAdminContract.connect(owner).addToWhitelist(
        othersAccount[0].address
      );
      const isWhitelistedAfter = await WhitelistAdminContract.isWhiteListed(
        othersAccount[0].address
      );

      expect(isWhitelistedBefore).to.be.equal(false);
      expect(isWhitelistedAfter).to.be.equal(true);
    });

    it("Should'nt add an address who is already in the whitelist", async function () {
      await expect(
        WhitelistAdminContract.connect(owner).addToWhitelist(
          othersAccount[0].address
        )
      ).to.be.rejectedWith("address in the whitelist");
    });

    it("Should'nt add an address who is in the blacklist", async function () {
      await WhitelistAdminContract.connect(owner).addToBlacklist(
        othersAccount[1].address
      );

      await expect(
        WhitelistAdminContract.connect(owner).addToWhitelist(
          othersAccount[1].address
        )
      ).to.be.rejectedWith("address in the blacklist");
    });

    it("Should emit whitelisted event", async function () {
      await expect(
        WhitelistAdminContract.connect(owner).addToWhitelist(
          othersAccount[2].address
        )
      )
        .to.emit(WhitelistAdminContract, "whitelisted")
        .withArgs(othersAccount[2].address);
    });
  });

  describe("Blacklist", function () {
    let BlacklistAdminContract: Admin;

    before("Init contract", async function () {
      const { _adminContract } = await deployContract();
      BlacklistAdminContract = _adminContract;
    });

    it("Should add an address to the blacklist", async function () {
      const isWhitelistedBefore = await BlacklistAdminContract.isBlackListed(
        othersAccount[0].address
      );
      await BlacklistAdminContract.connect(owner).addToBlacklist(
        othersAccount[0].address
      );
      const isWhitelistedAfter = await BlacklistAdminContract.isBlackListed(
        othersAccount[0].address
      );

      expect(isWhitelistedBefore).to.be.equal(false);
      expect(isWhitelistedAfter).to.be.equal(true);
    });

    it("Should'nt add an address who is already in the blacklist", async function () {
      await expect(
        BlacklistAdminContract.connect(owner).addToBlacklist(
          othersAccount[0].address
        )
      ).to.be.rejectedWith("address is already the blacklist");
    });

    it("Should'nt add an address who is in the whitelist", async function () {
      await BlacklistAdminContract.connect(owner).addToWhitelist(
        othersAccount[1].address
      );

      await expect(
        BlacklistAdminContract.connect(owner).addToWhitelist(
          othersAccount[1].address
        )
      ).to.be.rejectedWith("address in the whitelist");
    });

    it("Should emit whitelisted event", async function () {
      await expect(
        BlacklistAdminContract.connect(owner).addToBlacklist(
          othersAccount[2].address
        )
      )
        .to.emit(BlacklistAdminContract, "blacklisted")
        .withArgs(othersAccount[2].address);
    });
  });

  describe("removeFromTheWhitelist", function () {
    let removeFromTheWhitelistAdminContract: Admin;

    before("Init contract", async function () {
      const { _adminContract } = await deployContract();
      removeFromTheWhitelistAdminContract = _adminContract;
      await removeFromTheWhitelistAdminContract
        .connect(owner)
        .addToWhitelist(othersAccount[0].address);
      await removeFromTheWhitelistAdminContract
        .connect(owner)
        .addToWhitelist(othersAccount[1].address);
    });

    it("Should delete an address from the whitelist", async function () {
      const isWhiteListedBefore =
        await removeFromTheWhitelistAdminContract.isWhiteListed(
          othersAccount[0].address
        );

      await removeFromTheWhitelistAdminContract.removeFromWhitelist(
        othersAccount[0].address
      );

      const isWhiteListedAfter =
        await removeFromTheWhitelistAdminContract.isWhiteListed(
          othersAccount[0].address
        );

      expect(isWhiteListedBefore).to.be.equal(true);
      expect(isWhiteListedAfter).to.be.equal(false);
    });

    it("Should'nt delete an address who is not in the whitelist", async function () {
      await expect(
        removeFromTheWhitelistAdminContract.removeFromWhitelist(
          othersAccount[0].address
        )
      ).to.be.rejectedWith("address not in the whitelist");
    });
  });

  describe("removeFromTheWhitelist", function () {
    let removeFromTheBlacklistAdminContract: Admin;

    before("Init contract", async function () {
      const { _adminContract } = await deployContract();
      removeFromTheBlacklistAdminContract = _adminContract;
      await removeFromTheBlacklistAdminContract
        .connect(owner)
        .addToBlacklist(othersAccount[0].address);
      await removeFromTheBlacklistAdminContract
        .connect(owner)
        .addToBlacklist(othersAccount[1].address);
    });

    it("Should delete an address from the blacklist", async function () {
      const isWhiteListedBefore =
        await removeFromTheBlacklistAdminContract.isBlackListed(
          othersAccount[0].address
        );

      await removeFromTheBlacklistAdminContract.removeFromBlacklist(
        othersAccount[0].address
      );

      const isWhiteListedAfter =
        await removeFromTheBlacklistAdminContract.isBlackListed(
          othersAccount[0].address
        );

      expect(isWhiteListedBefore).to.be.equal(true);
      expect(isWhiteListedAfter).to.be.equal(false);
    });

    it("Should'nt delete an address who is not in the blacklist", async function () {
      await expect(
        removeFromTheBlacklistAdminContract.removeFromBlacklist(
          othersAccount[0].address
        )
      ).to.be.rejectedWith("address is not in the blacklist'");
    });
  });

  describe("isWhitelisted", function () {
    it("Should return if address is whitelisted", async function () {
      const isWhitelisted = await AdminContract.isWhiteListed(
        othersAccount[0].address
      );

      expect(isWhitelisted).to.be.equal(false);
    });

    it("OtherAccount[0] should be whitelisted", async function () {
      await AdminContract.addToWhitelist(othersAccount[0].address);
      const isWhitelisted = await AdminContract.isWhiteListed(
        othersAccount[0].address
      );

      expect(isWhitelisted).to.be.equal(true);
    });
  });

  describe("isBlacklisted", function () {
    it("Should return if address is whitelisted", async function () {
      const isWhitelisted = await AdminContract.isBlackListed(
        othersAccount[1].address
      );

      expect(isWhitelisted).to.be.equal(false);
    });

    it("OtherAccount[1] should be whitelisted", async function () {
      await AdminContract.addToBlacklist(othersAccount[1].address);
      const isWhitelisted = await AdminContract.isBlackListed(
        othersAccount[1].address
      );

      expect(isWhitelisted).to.be.equal(true);
    });
  });
});

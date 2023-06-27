import { ethers } from "hardhat";
import { expect } from "chai";
import { ProjectVote } from "../typechain-types/ProjectVote";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

describe("ProjectVote", function () {
  let testIndex = 1;
  async function deployContract() {
    const [_owner, ..._othersAccounts] = await ethers.getSigners();
    const ProjectVote = await ethers.getContractFactory("ProjectVote");
    const _projectVote = await ProjectVote.deploy();

    return { _projectVote, _owner, _othersAccounts };
  }

  describe("OnlyOwner", function () {
    let projectVote: ProjectVote;
    let owner: SignerWithAddress;
    let otherAccounts: SignerWithAddress[];

    before("initContract", async function () {
      const { _projectVote, _owner, _othersAccounts } = await deployContract();
      projectVote = _projectVote;
      owner = _owner;
      otherAccounts = _othersAccounts;
    });

    it(`${testIndex++} : Owner should access to addToWhitelist`, async function () {
      expect(
        await projectVote
          .connect(owner)
          .addToWhiteList(otherAccounts[0].address)
      ).to.not.be.reverted;
    });

    it(`${testIndex++} : Owner should access to changeStatus`, async function () {
      expect(await projectVote.connect(owner).changeStatus(1)).to.not.be
        .reverted;
    });

    it(`${testIndex++} : OtherAccounts[0] should't access to addToWhitelist`, async function () {
      await expect(
        projectVote
          .connect(otherAccounts[0])
          .addToWhiteList(otherAccounts[0].address)
      ).to.be.revertedWith("You are not the admin");
    });

    it(`${testIndex++} : OtherAccounts[0] should'nt access to changeStatus`, async function () {
      await expect(
        projectVote
          .connect(otherAccounts[0])
          .changeStatus(ethers.BigNumber.from(1))
      ).to.be.revertedWith("You are not the admin");
    });
  });

  describe("onlyWhitelised", function () {
    let projectVote: ProjectVote;
    let owner: SignerWithAddress;
    let otherAccounts: SignerWithAddress[];

    before("initContract", async function () {
      const { _projectVote, _owner, _othersAccounts } = await deployContract();
      projectVote = _projectVote;
      owner = _owner;
      otherAccounts = _othersAccounts;
      await projectVote.addToWhiteList(owner.address);
    });

    it(`${testIndex++} : Should access to addProposal if whitelisted`, async function () {
      await projectVote.changeStatus(1);
      await expect(projectVote.connect(owner).addProposal("test")).to.not.be
        .rejected;
    });

    it(`${testIndex++} : Should'nt access to addProposal if whitelisted`, async function () {
      await expect(
        projectVote.connect(otherAccounts[0]).addProposal("test")
      ).to.be.rejectedWith("You are not whitelisted");
    });

    it(`${testIndex++} : Should getProposal if whitelisted`, async function () {
      await expect(projectVote.connect(owner).getProposal(0)).to.be.not
        .rejected;
    });

    it(`${testIndex++} : Should'nt getProposal if not whitelisted`, async function () {
      await expect(
        projectVote.connect(otherAccounts[0]).getProposal(0)
      ).to.be.rejectedWith("You are not whitelisted");
    });

    it(`${testIndex++} : Should vote if whitelisted`, async function () {
      await projectVote.changeStatus(2);
      await expect(projectVote.connect(owner).vote(0)).to.be.not.rejected;
    });

    it(`${testIndex++} : Should'nt vote is if not whitelisted`, async function () {
      await expect(
        projectVote.connect(otherAccounts[0]).vote(0)
      ).to.be.rejectedWith("You are not whitelisted");
    });

    it(`${testIndex++} : Should'nt resetVote is if not whitelisted`, async function () {
      await expect(
        projectVote.connect(otherAccounts[0]).resetVote()
      ).to.be.rejectedWith("You are not whitelisted");
    });
  });

  describe("Change Status", function () {
    let projectVote: ProjectVote;
    let owner: SignerWithAddress;
    let otherAccounts: SignerWithAddress[];

    before("initContract", async function () {
      const { _projectVote, _owner, _othersAccounts } = await deployContract();
      projectVote = _projectVote;
      owner = _owner;
      otherAccounts = _othersAccounts;
      await projectVote.addToWhiteList(owner.address);
    });

    it(`${testIndex++} : Could access to addToWhilist with userEnregistrement status`, async function () {
      const state = await projectVote.state();
      expect(state).to.be.equal(0);
      await expect(
        projectVote.connect(owner).addToWhiteList(otherAccounts[1].address)
      ).to.not.be.rejected;
    });

    it(`${testIndex++} : Should set status to proposalEnregistrement`, async function () {
      await projectVote.connect(owner).changeStatus(1);
      const state = await projectVote.state();

      expect(state).to.be.equal(1);
    });

    it(`${testIndex++} : Couldn't access to addToWhitelist if not userEnregistrement status`, async function () {
      await expect(
        projectVote.addToWhiteList(otherAccounts[0].address)
      ).to.be.rejectedWith("You can't do this right now");
    });

    it(`${testIndex++} : Shouldn't set status to is voteStarted if no proposal`, async function () {
      await expect(projectVote.connect(owner).changeStatus(2)).to.be.rejected;
    });

    it(`${testIndex++} : Could access to sendProposal with proposalEnregistrement status`, async function () {
      const state = await projectVote.state();
      expect(state).to.be.equal(1);
      await expect(projectVote.connect(owner).addProposal("test")).to.not.be
        .rejected;
    });

    it(`${testIndex++} : Should set status to is voteStarted`, async function () {
      await projectVote.connect(owner).changeStatus(2);
      const state = await projectVote.state();

      expect(state).to.be.equal(2);
    });

    it(`${testIndex++} : Couldn't access to sendProposal if not proposalEnregistrement status`, async function () {
      await expect(projectVote.addProposal("test")).to.be.rejectedWith(
        "You can't do this right now"
      );
    });

    it(`${testIndex++} : Could access to vote with voteStarted status`, async function () {
      const state = await projectVote.state();
      expect(state).to.be.equal(2);
      await expect(projectVote.connect(owner).vote(0)).to.not.be.rejected;
    });

    it(`${testIndex++} : Should'nt reset status if status is voteEnded`, async function () {
      await expect(
        projectVote.connect(owner).changeStatus(0)
      ).to.be.rejectedWith("Can't come back");
    });

    it(`${testIndex++} : Should set status to is voteEnded`, async function () {
      await projectVote.connect(owner).changeStatus(3);
      const state = await projectVote.state();
      expect(state).to.be.equal(3);
    });

    it(`${testIndex++} : Couldn't access to vote if not voteStarted status`, async function () {
      await expect(projectVote.vote(0)).to.be.rejectedWith(
        "You can't do this right now"
      );
    });

    it(`${testIndex++} : Could access to getWinner if not voteEnded status`, async function () {
      const state = await projectVote.state();
      expect(state).to.be.equal(3);
      await expect(projectVote.getWinner()).to.not.be.rejected;
    });

    it(`${testIndex++} : Couldn't to resetVote if not userRegistrement status`, async function () {
      await expect(projectVote.resetVote()).to.be.rejectedWith(
        "You can't do this right now"
      );
    });

    it(`${testIndex++} : Should reset status if status is voteEnded`, async function () {
      await projectVote.connect(owner).changeStatus(0);
      const state = await projectVote.state();
      expect(state).to.be.equal(0);
    });

    it(`${testIndex++} : Could access to resetVote if userREgistrement status`, async function () {
      await expect(projectVote.resetVote()).to.not.be.rejected;
    });

    it(`${testIndex++} : Couldn't getWinner to vote if not voteEnded status`, async function () {
      await expect(projectVote.getWinner()).to.be.rejectedWith(
        "You can't do this right now"
      );
    });
  });

  describe("Add to whitelist", function () {
    let projectVote: ProjectVote;
    let owner: SignerWithAddress;
    let otherAccounts: SignerWithAddress[];

    before("initContract", async function () {
      const { _projectVote, _owner, _othersAccounts } = await deployContract();
      projectVote = _projectVote;
      owner = _owner;
      otherAccounts = _othersAccounts;
      await projectVote.addToWhiteList(owner.address);
    });

    it(`${testIndex++} : Should add an address to the whitelist`, async function () {
      await expect(
        projectVote.connect(owner).addToWhiteList(otherAccounts[0].address)
      ).to.not.be.rejected;
    });

    it(`${testIndex++} : Should'nt add an address already in the whitelist`, async function () {
      await expect(
        projectVote.connect(owner).addToWhiteList(otherAccounts[0].address)
      ).to.be.rejectedWith("user is already whitelsited");
    });

    it(`${testIndex++} : Should add a proposal`, async function () {
      projectVote.connect(owner).changeStatus(1);
      await expect(projectVote.connect(owner).addProposal("test")).to.not.be
        .rejected;
    });
  });

  describe("Add proposal", function () {
    let projectVote: ProjectVote;
    let owner: SignerWithAddress;
    let otherAccounts: SignerWithAddress[];

    before("initContract", async function () {
      const { _projectVote, _owner, _othersAccounts } = await deployContract();
      projectVote = _projectVote;
      owner = _owner;
      otherAccounts = _othersAccounts;
      await projectVote.addToWhiteList(owner.address);
      await projectVote.connect(owner).changeStatus(1);
    });

    it(`${testIndex++} : Should add a proposal`, async function () {
      const proposal = "test";
      await expect(projectVote.connect(owner).addProposal(proposal)).to.not.be
        .rejected;
      const contractProposal = await projectVote.getProposal(0);
      expect(contractProposal.content).to.be.equal(proposal);
      expect(contractProposal.proposalId).to.be.equal(ethers.BigNumber.from(0));
      expect(contractProposal.voteCount).to.be.equal(ethers.BigNumber.from(0));
    });

    it(`${testIndex++} : Should add an other proposal`, async function () {
      const proposal = "test2";
      await expect(projectVote.connect(owner).addProposal(proposal)).to.not.be
        .rejected;
      const contractProposal = await projectVote.getProposal(1);
      expect(contractProposal.content).to.be.equal(proposal);
      expect(contractProposal.proposalId).to.be.equal(ethers.BigNumber.from(1));
      expect(contractProposal.voteCount).to.be.equal(ethers.BigNumber.from(0));
    });

    it(`${testIndex++} : Should add an other proposal`, async function () {
      const proposal = "test2";
      await expect(projectVote.connect(owner).addProposal(proposal)).to.not.be
        .rejected;
      const contractProposal = await projectVote.getProposal(1);
      expect(contractProposal.content).to.be.equal(proposal);
      expect(contractProposal.proposalId).to.be.equal(ethers.BigNumber.from(1));
      expect(contractProposal.voteCount).to.be.equal(ethers.BigNumber.from(0));
    });
  });

  describe("Vote", function () {
    let projectVote: ProjectVote;
    let owner: SignerWithAddress;
    let otherAccounts: SignerWithAddress[];

    before("initContract", async function () {
      const { _projectVote, _owner, _othersAccounts } = await deployContract();
      projectVote = _projectVote;
      owner = _owner;
      otherAccounts = _othersAccounts;
      await projectVote.addToWhiteList(owner.address);
      await projectVote.addToWhiteList(otherAccounts[0].address);
      await projectVote.addToWhiteList(otherAccounts[1].address);
      await projectVote.connect(owner).changeStatus(1);
      projectVote.connect(owner).addProposal("test");
      projectVote.connect(otherAccounts[0]).addProposal("test2");
      await projectVote.connect(owner).changeStatus(2);
    });

    it(`${testIndex++} : Should add a vote for a proposal 0`, async function () {
      await expect(projectVote.connect(owner).vote(0)).to.not.be.rejected;
      const proposal = await projectVote.getProposal(0);
      expect(proposal.voteCount).to.be.equal(ethers.BigNumber.from(1));
    });

    it(`${testIndex++} : Should'nt vote twice`, async function () {
      await expect(projectVote.connect(owner).vote(0)).to.be.rejectedWith(
        "You have already voted"
      );
    });

    it(`${testIndex++} : proposal 0 should be the winner`, async function () {
      await expect(projectVote.connect(otherAccounts[0]).vote(0)).to.not.be
        .rejected;
      await expect(projectVote.connect(otherAccounts[1]).vote(1)).to.not.be
        .rejected;
      await projectVote.connect(owner).changeStatus(3);

      const winner = await projectVote.getWinner();
      const proposal0 = await projectVote.getProposal(0);

      expect(winner.content).to.be.equal(proposal0.content);
      expect(winner.proposalId).to.be.equal(proposal0.proposalId);
    });
  });

  describe("ResetVote", function () {
    let projectVote: ProjectVote;
    let owner: SignerWithAddress;
    let otherAccounts: SignerWithAddress[];

    before("initContract", async function () {
      const { _projectVote, _owner, _othersAccounts } = await deployContract();
      projectVote = _projectVote;
      owner = _owner;
      otherAccounts = _othersAccounts;
      await projectVote.addToWhiteList(owner.address);
      await projectVote.addToWhiteList(otherAccounts[0].address);
      await projectVote.connect(owner).changeStatus(1);
      projectVote.connect(owner).addProposal("test");
      await projectVote.connect(owner).changeStatus(2);
      await projectVote.connect(owner).vote(1);
      await projectVote.connect(owner).changeStatus(3);
      await projectVote.connect(owner).changeStatus(0);
    });

    it(`${testIndex++} : Should reset hasVoted`, async function () {
      await expect(projectVote.resetVote()).to.be.not.rejected;
    });

    it(`${testIndex++} : Should'nt reset hasVoted`, async function () {
      await projectVote.connect(owner).changeStatus(1);

      await expect(projectVote.resetVote()).to.be.rejectedWith(
        "You can't do this right now"
      );
    });

    it(`${testIndex++} : Should vote again`, async function () {
      projectVote.connect(owner).addProposal("test");
      await projectVote.connect(owner).changeStatus(2);
      await expect(projectVote.connect(owner).vote(1)).to.not.be.rejected;
    });
  });
});

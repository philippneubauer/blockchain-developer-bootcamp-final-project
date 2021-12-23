const Auction = artifacts.require("Auction");

contract("Auction", (accounts) => {
  let auction;
  let expectedBeneficiary;

  before(async () => {
      auction = await Auction.deployed();
  });

  describe("paying for a favour and retrieving account addresses", async () => {
    before("pay for a favour using accounts[0]", async () => {
      await auction.pay(5, { from: accounts[0] });
      expectedBeneficiary = accounts[0];
    });
  
    it("can fetch the address of a beneficiary by favour id", async () => {
      const beneficiary = await auction.beneficiaries(5);
      assert.equal(beneficiary, expectedBeneficiary, "The beneficiary of the paid favour should be the first account.");
    });

    it("can fetch the collection of all favour beneficiaries' addresses", async () => {
        const beneficiaries = await auction.getBeneficiaries();
        assert.equal(beneficiaries[5], expectedBeneficiary, "The beneficiary of the paid favour should be in the collection.");
      });

    //owner is owner
    // it("is owned by owner", async () => {
    //   assert.equal(
    //     await instance.owner.call(),
    //     contractOwner,
    //     "owner is not correct",
    //   );
    // });
    //beneficiary has sufficient funds

  });


});
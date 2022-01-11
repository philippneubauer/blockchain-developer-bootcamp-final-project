const Auction = artifacts.require(",/Auction.sol");

const getErrorObj = (obj = {}) => {
  const txHash = Object.keys(obj)[0];
  return obj[txHash];
};

// Two test favours are defined below to validate the Auction contract.
const addFirstFavour = async (instance, tx = {}) => {
  await instance.addFavour(
    web3.utils.toWei("0.00236"),
    "cleaning the floor",
    "Kitchen",
    "Hard",
    "30 minutes",
    "https://pic.onlinewebfonts.com/svg/img_573600.png",
    tx
  );
};

const addSecondFavour = async (instance, tx = {}) => {
  await instance.addFavour(
    web3.utils.toWei("0.00319"),
    "clean the mirror",
    "Bathroom",
    "Medium",
    "10 minutes",
    "https://pic.onlinewebfonts.com/svg/img_573600.png",
    tx
  );
};

const ERR_NOT_AVAILABLE = "This favour is not available.";
const ERR_EXACT_AMOUNT = "Please pay exact amount.";
const ERR_NOT_OWNER = "Ownable: caller is not the owner";

const ADDRESS_ZERO = "0x0000000000000000000000000000000000000000";

const Status = {
  AVAILABLE: 0,
  CONSUMED: 1,
  NOT_AVAILABLE: 2,
};

contract("Auction", function (accounts) {
  const [owner, secondAccount] = accounts;

  beforeEach(async () => {
    instance = await Auction.new();
    await addFirstFavour(instance, { from: owner });
    await addSecondFavour(instance, { from: owner });
  });

  /**
   * Checks that the contract inherits OpenZeppelin Ownable by using owner()
   */
  it("first account must be added by owner using OpenZeppelin Ownable", async () => {
    assert.strictEqual(await instance.owner(), owner);
  });

  describe("addAsBeneficiary()", () => {
    /**
     * Adds a beneficiary to a favour and then attempts second addition to the same favour.
     */
    it("if favour is not available attempt to pay should fail", async () => {
      await instance.addAsBeneficiary(0);
      try {
        await instance.addAsBeneficiary(0);
      } catch (e) {
        const { error, reason } = getErrorObj(e.data);
        assert.equal(error, "revert");
        assert.equal(reason, ERR_NOT_AVAILABLE);
      }
    });

    /**
     * Test to add a beneficiary with a wrong amount.
     */
    it("if payment is not exact attempt to pay should fail", async () => {
      try {
        await instance.addAsBeneficiary(0, { value: web3.utils.toWei("0.002530") });
      } catch (e) {
        const { error, reason } = getErrorObj(e.data);
        assert.equal(error, "revert");
        assert.equal(reason, ERR_EXACT_AMOUNT);
      }
    });

    /**
     * Before a beneficiary is added it must be checked whether a listing is available. Followed by a status update to "CONSUMED".
     */
    it("beneficiary should be added to a favour and the favour status should be updated", async () => {
      const LISTING_ID = 1;
      const actualBefore = await instance.favours(LISTING_ID);
      assert.equal(actualBefore.status.toNumber(), Status.AVAILABLE);

      await instance.addAsBeneficiary(LISTING_ID, {
        from: secondAccount,
        value: web3.utils.toWei("0.00236"),
      });

      const actual = await instance.favours(LISTING_ID);
      assert.equal(actual.beneficiary, secondAccount);
      assert.equal(actual.status.toNumber(), Status.CONSUMED);
    });

    /**
     * Verifies the payAmount is sent to the owner address in full.
     */
    it("given payAmount should be sent to owner address", async () => {
      const LISTING_ID = 1;
      const balanceBefore = await web3.eth.getBalance(owner);
      await instance.addAsBeneficiary(LISTING_ID, {
        from: secondAccount,
        value: web3.utils.toWei("0.00236"),
      });
      const balanceAfter = await web3.eth.getBalance(owner);
      const listing = await instance.favours(LISTING_ID);
      const pay = listing.currentPayAmount.toNumber();
      assert.equal(balanceAfter - balanceBefore, pay);
    });
  });

  describe("addFavour()", () => {
    /**
     * Verification of ownable usage in function.
     */
    it("only the owner should be allowed to add favours", async () => {
      try {
        await addFirstFavour(instance, { from: secondAccount });
      } catch (e) {
        const { error, reason } = getErrorObj(e.data);
        assert.equal(error, "revert");
        assert.equal(reason, ERR_NOT_OWNER);
      }
    });

    /**
     * Verification: given favour gets added to favours mapping and length counter gets incremented
     */
    it("a favour should be added to favours mapping", async () => {
      const idListLengthBefore = await instance.idListLength();
      await addSecondFavour(instance, { from: owner });
      const idListLengthAfter = await instance.idListLength();
      assert.equal(
        idListLengthAfter.toNumber(),
        idListLengthBefore.toNumber() + 1
      );
      const { beneficiary } = await instance.favours(3);
      assert.equal(beneficiary, ADDRESS_ZERO);
    });
  });
});



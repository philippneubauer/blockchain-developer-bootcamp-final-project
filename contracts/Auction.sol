// SPDX-License-Identifier: MIT
pragma solidity 0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

//// @title A community Auction
//// @author Philipp Neubauer
//// @notice This contract is the MVP - potentially to be developed further
//// @dev All functions are currently implemented without side effects
//// @custom This is an experimental contract for testing purposes
contract Auction is Ownable {


  // when a beneficiary pays for a favour
  event LogBeneficiaryAdded(uint indexed favour, address indexed beneficiary);

  // when a new favour is added
  event LogFavourAdded(uint indexed favour, uint indexed payAmount);

  event LogUints(uint indexed i, uint indexed idListLength);

  /// @dev Tracks given favour ids. Current value is the newest favour id.
  uint private favourIdCounter = 0;

  enum State{ Available, Consumed, NotAvailable }
  enum PaymentState{ Success, NoSuccess }

  struct Favour {
    uint favourId;
    string description;
    uint currentPayAmount;
    State status;
    address payable beneficiary;
    string location;
    string difficulty;
    string time;
    string imgUrl;
    Payment latestBeneficiaryPayment;
  }

  struct Payment {
    uint timestamp;
    uint amount;
    address from;
    PaymentState paymentStatus;
  }

/// @notice List of all favours ids.
  /// @dev Used as a helper when iterating available favours.
  uint[] public idList;

  /// @notice idList length.
  /// @dev Used as a helper when iterating available favours.
  uint public idListLength;

  mapping (uint => Favour) public favours;

  modifier isAvailable(uint id) {
    require(favours[id].status == State.Available && favours[id].beneficiary == address(0), "This favour is not available.");
    _;
  }

  modifier isExactPayment(uint id) {
    require(favours[id].currentPayAmount == msg.value, "Please pay exact amount.");
    _;
  }

  constructor() {}

  /// @notice Adds a beneficiary to a given favour id
  /// @param _favourId Favour to which the sender address is added as a beneficiary
  /// @dev Check for exact payment sum to avoid having to send ETH back to sender
  function addAsBeneficiary(uint _favourId)
    public
    payable
    isAvailable(_favourId)
    isExactPayment(_favourId) {
      Favour storage _f = favours[_favourId];
      _f.beneficiary = payable(msg.sender);
      _f.latestBeneficiaryPayment = Payment({ timestamp: block.timestamp, amount: msg.value, from: msg.sender, paymentStatus: PaymentState.Success });
      _f.status = State.Consumed;
      address communityMember = owner();
      (bool success, ) = communityMember.call{ value: msg.value }("");
      require(success, "Adding a beneficiary to favour failed.");
      emit LogBeneficiaryAdded(_favourId, msg.sender);
    }

  //// @notice Adds a favour listing into contract state
  //// @param payAmount Listing a favour's amount in gwei
  //// @param _description Short description of favour
  //// @param _location Location at home as a string, e.g. Kitchen or Bathroom
  //// @param _difficulty Subjective evaluation of a favour's difficulty
  //// @param _time Estimated time to complete the favour
  //// @param _imgUrl Url to an image of listing to be displayed in the web app.
  
  function addFavour(
    uint payAmount,
    string memory _description,
    string memory _location,
    string memory _difficulty,
    string memory _time,
    string memory _imgUrl) public onlyOwner {
      uint newFavourId = favourIdCounter + 1;

      Favour memory newFavour = Favour({
        favourId: newFavourId,
        description: _description,
        currentPayAmount: payAmount,
        status: State.Available,
        beneficiary: payable(address(0)),
        location: _location,
        difficulty: _difficulty,
        time: _time,
        imgUrl: _imgUrl,
        latestBeneficiaryPayment: Payment({
          timestamp: block.timestamp,
          from: address(0),
          amount: 0,
          paymentStatus: PaymentState.Success
        })
      });

      favourIdCounter = newFavourId;
      idList.push(newFavourId);
      idListLength = idList.length;
      favours[newFavour.favourId] = newFavour;
      emit LogFavourAdded(newFavour.favourId, payAmount); 
  }

/************ For future development ****************/

  /// @notice Remove a favour
  /// @param _id favour/listing id
  /// @dev This function may only be called by the owner
  function removeFavour(uint _id) private onlyOwner {
    // TODO: remove a listing entirely
    // delete favours[_id];
    // TODO: remove _id from idList
  }

/// @notice A function for the potential withdrawal of contract funds
  /// @dev This function may only be called by the contract owner
  function removeBeneficiary(uint _id) private onlyOwner{
  }

  /// @notice A function for the potential withdrawal of contract funds
  /// @dev This function may only be called by the contract owner
  function withdraw() public onlyOwner {
    // TODO: withdraw any funds from contract
  }

}

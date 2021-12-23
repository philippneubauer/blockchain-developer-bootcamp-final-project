// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

contract Auction {

address[16] public beneficiaries;


// paying for a favour
function pay(uint favourId) public returns (uint) {
  require(favourId >= 0 && favourId <= 15);

  beneficiaries[favourId] = msg.sender;

  return favourId;
}

// Retrieving the beneficiaries
function getBeneficiaries() public view returns (address[16] memory) {
  return beneficiaries;
}
}
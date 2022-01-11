Design Patterns

Inheritance and Interfaces
The contract named "Auction" inherits the OpenZeppelin Ownable contract to define one account as the contract owner. This owner has the rights to to performe administative tasks (please see below).

Access Control Design Pattern
Only the contract owner (i.e. the party responsible for the development of the community auction) posesses full access control. The Ownable design pattern is implemented in the following three functions: (1) removeFavour(), (2) removeBeneficiary() and (3) withdraw().
Security Measures

SWC-103 - Floating Pragma
A Specific Compiler Pragma was chosen to limit the introduction of bugs in different compiler versions.

SWC-105 - Unprotected Ether Withdrawal
OpenZeppelin's ownable contract protects the withdraw() function with its "onlyOwner" modifier.

Pull Over Push (Prioritize receiving contract calls over making contract calls)
Functions that result in a state change rely on pull and not push calls. 

Use of Require
Require is used in all modifier validations. 
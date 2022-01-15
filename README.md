# blockchain-developer-bootcamp-final-project

Please access Rafiki's community favour auction here: https://philippneubauer.github.io/blockchain-developer-bootcamp-final-project/


### **IDEA: RAFIKI - A community auction for shared appartments**

Workflow:
1) Auction host (i.e. contract owner) creates new favours on auction platform
2) Community can pay the owner for a favour who collects money for internal distribution
3) If desired a favour may be added by the owner

// use case definition 
e.g. 
  - do the laundry
  - take the garbage out
  - fill the dishwasher

## Instructions
 ### Installing dependencies:
    Truffle v5.4.23 (core: 5.4.23)
    Solidity - 0.8.2 (solc-js)
    Node v17.0.1
    Web3.js v1.2.7
    Ganache v2.5.4
    
	run the below commands:
	1. npm install
	2. npm install lite-server --save-dev

 ## How to run the smart contract locally:
**uint tests**
	
	run the below commands:
	1) truffle compile
	2) truffle migrate
	3) truffle test
    
    Which port should a local testnet be running on?
      port: 7545
	
  **Test favours on local host:3000**
  
	 run the below commands to enter truffle dev. and add favours:
	 1. truffle migrate --network development
	 2. truffle console --network development
	 3. let ra = await Auction.deployed()

    [ensure you use the owner's account as it will otherwise not work - account address accessible with ra.owner()]

    Add some favours:
    ra.addFavour(web3.utils.toWei("0.00241"), "cleaning the floor", "Kitchen", "Hard", "30 minutes", "https://pic.onlinewebfonts.com/svg/img_573600.png")
    ra.addFavour(web3.utils.toWei("0.00318"), "cleaning the mirror", "Bathroom", "Easy", "10 minutes", "https://pic.onlinewebfonts.com/svg/img_573600.png")
    ra.addFavour(web3.utils.toWei("0.00519"), "cleaning the toilet", "Toilet", "Hard", "10 minutes", "https://pic.onlinewebfonts.com/svg/img_573600.png")
    ra.addFavour(web3.utils.toWei("0.002415"), "cleaning the window", "Living Room", "Medium", "30 minutes", "https://pic.onlinewebfonts.com/svg/img_573600.png")
    ra.addFavour(web3.utils.toWei("0.002543"), "cleaning the tap", "Bathroom", "Easy", "2 minutes", 
    
    If need be, send yourself some test ETH to your local wallet:
    web3.eth.sendTransaction({ from: "<your local address>", to: "<your local network wallet>", value: web3.utils.toWei("25") })

    start local web server: npm run dev
    [In case you would like to test
      - "addAsBeneficiary" function: ra.addAsBeneficiary(3, { value: web3.utils.toWei("0.00519")}) 
      - show information of a favour depending on its Id: ra.favours(1)]


## For future development
Example workflow for the future:
1. User create profile by providing basic credentials (name, email, ...)
2. New user profile gets validated by network participants
3. Permitted users receive a balance of XX RAF (RafikiCoin) to be added as medium of exchange on platform
4. Users can define new favours
5. New favours will be put for a vote on the price within a given time window
6. Favours get paid in RAF


RAF - RafikiCoin:
   brainstorming idea: economic incentives to trade currency: 3% interest per month on current holdings

---

Screencast of walking through the project: [tba]

Public Ethereum account for NFT certification transfer: []

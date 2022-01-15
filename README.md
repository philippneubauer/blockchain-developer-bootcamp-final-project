
# blockchain-developer-bootcamp-final-project

Project description:
[general project description, description of directory structure, where to access frontend project]


////////////////////////

Instructions:
  Installing dependencies:
    Truffle v5.4.23 (core: 5.4.23)
    Solidity - 0.8.2 (solc-js)
    Node v17.0.1
    Web3.js v1.2.7
    
    npm install
    npm install lite-server --save-dev
    
  Acessing the project:
    

  How to run the smart contract uint tests locally:
    1) truffle compile
    2) truffle migrate
    3) truffle test
   
    Which port should a local testnet be running on?
      port: 7545


  running on local host:3000
    truffle migrate --network development
    truffle console --network development
    let ra = await Auction.deployed()
    [ensure you use the owner's account as it will otherwise not work - account address accessible with ra.owner()]

    Add some favours:
    ra.addFavour(web3.utils.toWei("0.00241"), "cleaning the floor", "Kitchen", "Hard", "30 minutes", "https://pic.onlinewebfonts.com/svg/img_573600.png")
    ra.addFavour(web3.utils.toWei("0.00318"), "cleaning the mirror", "Bathroom", "Easy", "10 minutes", "https://pic.onlinewebfonts.com/svg/img_573600.png")
    ra.addFavour(web3.utils.toWei("0.00519"), "cleaning the toilet", "Toilet", "Hard", "10 minutes", "https://pic.onlinewebfonts.com/svg/img_573600.png")
    ra.addFavour(web3.utils.toWei("0.002415"), "cleaning the window", "Living Room", "Medium", "30 minutes", "https://pic.onlinewebfonts.com/svg/img_573600.png")
    ra.addFavour(web3.utils.toWei("0.002543"), "cleaning the tap", "Bathroom", "Easy", "2 minutes", "https://pic.onlinewebfonts.com/svg/img_573600.png")
    ra.addFavour(web3.utils.toWei("0.002789"), "cleaning the desk", "Office", "Hard", "10 minutes", "https://pic.onlinewebfonts.com/svg/img_573600.png")
    ra.addFavour(web3.utils.toWei("0.002543"), "cleaning the chair", "Office", "Easy", "15 minutes", "https://pic.onlinewebfonts.com/svg/img_573600.png")
    ra.addFavour(web3.utils.toWei("0.002789"), "cleaning the drawer", "Office", "Easy", "5 minutes", "https://pic.onlinewebfonts.com/svg/img_573600.png")
    
    Send yourself some test ETH to your local wallet:
    web3.eth.sendTransaction({ from: "<your local address>", to: "<your local network wallet>", value: web3.utils.toWei("25") })

    start local web server: npm run dev
    [In case you would like to test
      - "addAsBeneficiary" function: ra.addAsBeneficiary(3, { value: web3.utils.toWei("0.00519")}) 
      - show information of a favour depending on its Id: ra.favours(1)]

Screencast of walking through the project: [link here]


///////////////

// IDEA: RAFIKI - A community currency for shared appartments

// use case definition and vote on price (i.e. X amount of the currency):
e.g. 
  - do the laundry
  - take the garbage out
  - fill the dishwasher
  - ...

// Economic incentives to trade currency: 3% interest per month on current holdings


Workflow:
1) Auction host (i.e. contract owner) creates new service on auction platform
2) Community can pay the owner for a service who performs service
3) If desired a service may be updated or removed by the owner




Example workflow for the future:
1. User create profile by providing basic incredentials (name, email, ...)
2. New user profile gets validated by network participants
3. Permitted users can define new use cases to be put for a vote on the price
4. ...


Public Ethereum account for NFT certification transfer: [Public address here]
const raAddress = '0x434EFa19d9c3090d9332c568A070Ab02ceF256c0'

const raABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "favour",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "beneficiary",
        "type": "address"
      }
    ],
    "name": "LogBeneficiaryAdded",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "favour",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "payAmount",
        "type": "uint256"
      }
    ],
    "name": "LogFavourAdded",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "i",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "idListLength",
        "type": "uint256"
      }
    ],
    "name": "LogUints",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "favours",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "favourId",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "description",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "currentPayAmount",
        "type": "uint256"
      },
      {
        "internalType": "enum Auction.State",
        "name": "status",
        "type": "uint8"
      },
      {
        "internalType": "address payable",
        "name": "beneficiary",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "location",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "difficulty",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "time",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "imgUrl",
        "type": "string"
      },
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "timestamp",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "from",
            "type": "address"
          },
          {
            "internalType": "enum Auction.PaymentState",
            "name": "paymentStatus",
            "type": "uint8"
          }
        ],
        "internalType": "struct Auction.Payment",
        "name": "latestBeneficiaryPayment",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "idList",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "idListLength",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_favourId",
        "type": "uint256"
      }
    ],
    "name": "addAsBeneficiary",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function",
    "payable": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "payAmount",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_description",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_location",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_difficulty",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_time",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_imgUrl",
        "type": "string"
      }
    ],
    "name": "addFavour",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "withdraw",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]


const App = {
  web3Provider: null,
  contracts: {},
  init: async function() {
    // Load favours.
    $.getJSON('../favours.json', function(data) {
      var favourRow = $('#favourRow');
      var favourTemplate = $('#favourTemplate');

      for (i = 0; i < data.length; i ++) {
        
        favourTemplate.find('.payAmount').text(data[i].name);
        favourTemplate.find('.description').text(data[i].name);
        
        favourTemplate.find('.panel-title').text(data[i].name);

        favourTemplate.find('img').attr('src', data[i].picture);
        favourTemplate.find('.favour-difficulty').text(data[i].difficulty);
        favourTemplate.find('.favour-time').text(data[i].time);
        favourTemplate.find('.favour-location').text(data[i].location);
        favourTemplate.find('.btn-pay').attr('data-id', data[i].id);

        favourRow.append(favourTemplate.html());
      }
    });

    return await App.initWeb3();
  },

  initWeb3: async function() {
    if (window.ethereum) {
      App.web3Provider = window.ethereum;
      try {
        // Request account access
        await window.ethereum.request({ method: "eth_accounts" });
        console.log('Metamask detected.')
        let mmDetected = document.getElementById('mm-detected')
        mmDetected.innerHTML = "MetaMask Has Been Dedected!"

        // add current account
        const mmEnable = document.getElementById('mm-connect');
            
        mmEnable.onclick = async () => {
          await ethereum.request({ method: 'eth_requestAccounts'})
          const mmCurrentAccount = document. getElementById('mm-current-account');
          mmCurrentAccount.innerHTML = "Here's your current account address: " + ethereum.selectedAddress
        }
      } catch (error) {
        // User denied account access...
        console.error("User denied account access")
      }
    }
    // // Legacy dapp browsers...
    // else if (window.web3) {
    //   App.web3Provider = window.web3.currentProvider;
    // }
      //   await window.ethereum.request({ method: "eth_requestAccounts" });;
      //   console.log('Metamask detected!')
      //   let mmDetected = document.getElementById('mm-detected')
      //   mmDetected.innerHTML = "Metamask Has Been Dedected!"
      // } catch (error) {
      //   // User denied account access...
      //   console.error("User denied account access")
 
// add which wallet has been dedected in the future
    // else if (typeof window.ethereum !== 'undefined') {
    //     console.log('Metamask detected!')
    //     let mmDetected = document.getElementById('mm-detected')
    //     mmDetected.innerHTML = "Metamask Has Been Dedected!"
    //   }
    // // Legacy dapp browsers...
    // else if (window.web3) {
    //   //  App.web3Provider = window.web3.currentProvider;
    // }
    

    else {
      // If no injected web3 instance is detected, fall back to Ganache
        // App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
        // 
      console.log('Metamask Not Available!')
      alert("You need to install MetaMask or another wallet!")
    }
    // App.getMetaskAccountID();
    web3 = new Web3(App.web3Provider);
    
    // return App.initContract();
    
  },



  // initContract: function() {
  //   $.getJSON('Auction.json', function(data) {
  //     // Get the necessary contract artifact file and instantiate it with @truffle/contract
  //     var AuctionArtifact = data;
  //     App.contracts.Auction = TruffleContract(AuctionArtifact);
    
  //     // Set the provider for our contract
  //     App.contracts.Auction.setProvider(App.web3Provider);
    
  //     // Use our contract to retrieve and mark the paid favours
  //     return App.markPaid();
  //   });

  //   return App.bindEvents();
  // },

  // bindEvents: function() {
  //   $(document).on('click', '.btn-pay', App.handlePay);
  // },

  // const raSubmit = document.getElementById
 

  markPaid: function() {
    var payInstance;

    App.contracts.Auction.deployed().then(function(instance) {
      payInstance = instance;
    
      return payInstance.LogBeneficiaryAdded.call();
    }).then(function(addAsBeneficiary) {
      for (i = 0; i < beneficiary.length; i++) {
        if (beneficiary[i] !== '0x0000000000000000000000000000000000000000') {
          $('.panel-favour').eq(i).find('button').text('Success').attr('disabled', true);
        }
      }
    }).catch(function(err) {
      console.log(err.message);
    });
  },


  handlePay: function(event) {
    event.preventDefault();

    var favourId = parseInt($(event.target).data('id'));
    var payInstance;

    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }

      var account = accounts[0];

      App.contracts.Auction.deployed().then(function(instance) {
        payInstance = instance;

        // Execute payment as a transaction by sending account
        return payInstance.pay(favourId, {from: account});
      }).then(function(result) {
        return App.markPaid();
      }).catch(function(err) {
        console.log(err.message);
      });
    });
  }

};

$(function() {
  $(window).load(function() {
    App.init();
  });
});





// window.addEventListener('load', function() {
  
//   if (typeof window.ethereum !== 'undefined') {
//     console.log('window.ethereum is enabled')
//     if (window.ethereum.isMetaMask === true) {
//       console.log('MetaMask is active')
//       let mmDetected = document.getElementById('mm-detected')
//       mmDetected.innerHTML += 'MetaMask is available!'

//       // add in web3 here
//       var web3 = new Web3(window.ethereum)

//     } else {
//       console.log('MetaMask is not available')
//       let mmDetected = document.getElementById('mm-detected')
//       mmDetected.innerHTML += 'MetaMask is not available - please install!'
//       // let node = document.createTextNode('<p>MetaMask is not available!<p>')
//       // mmDetected.appendChild(node)
//     }
//   } else {
//     console.log('window.ethereum is not found')
//     let mmDetected = document.getElementById('mm-detected')
//     mmDetected.innerHTML += '<p>MetaMask is not available - please install!<p>'
//   }
// })


// var web3 = new Web3(window.ethereum)


// // Grabbing the button object,  

// const mmEnable = document.getElementById('mm-connect');

 
// mmEnable.onclick = async () => {
//   await ethereum.request({ method: 'eth_requestAccounts'})
//   // grab mm-current-account
//   // and populate it with the current address
//   var mmCurrentAccount = document.getElementById('mm-current-account');
//   mmCurrentAccount.innerHTML = 'Current Account: ' + ethereum.selectedAddress
// }

// grab the button for input to a contract:

// const ssSubmit = document.getElementById('ss-input-button');

// ssSubmit.onclick = async () => {
//   // grab value from input
  
//   const ssInputValue = document.getElementById('ss-input-box').value;
//   console.log(ssInputValue)

//   var web3 = new Web3(window.ethereum)

//   // instantiate smart contract instance
  
//   const simpleStorage = new web3.eth.Contract(ssABI, ssAddress)
//   simpleStorage.setProvider(window.ethereum)

//   await simpleStorage.methods.store(ssInputValue).send({from: ethereum.selectedAddress})

// }

// const ssGetValue = document.getElementById('ss-get-value')

// ssGetValue.onclick = async () => {

//   var web3 = new Web3(window.ethereum)

//   const simpleStorage = new web3.eth.Contract(ssABI, ssAddress)
//   simpleStorage.setProvider(window.ethereum)

//   var value = await simpleStorage.methods.retrieve().call()

//   console.log(value)

//   const ssDisplayValue = document.getElementById('ss-display-value')

//   ssDisplayValue.innerHTML = 'Current Simple Storage Value: ' + value

// }




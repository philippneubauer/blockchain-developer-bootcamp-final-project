//change raAddress to local address if need be.
const raAddress = "0x434EFa19d9c3090d9332c568A070Ab02ceF256c0"

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


//connect to metamask and display current account - done
window.addEventListener('load', function() {

    if (window.ethereum) {
      App.web3Provider = window.ethereum;
      try {
        // Request account access
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
      else {
          console.log('Metamask Not Available!')
          alert("You need to install MetaMask or another wallet!")
        }
    // App.getMetaskAccountID();
    web3 = new Web3(App.web3Provider);
  })





// Container template
  const App = {
    web3Provider: null,
    contracts: {},
    init: async function() {
      //var web3 = new Web3(window.ethereum);
      // const Auction = new web3.eth.contract(raABI, raAddress);
      // // console.log(Auction)
      // const info = await Auction.methods.favours(1).call();

      // Load favours.
      console.log("init");
      var favourRow = $('#favourRow');
      var favourTemplate = $('#favourTemplate');

      var web3 = new Web3(window.ethereum);

      const Auction = new web3.eth.Contract(raABI, raAddress);
      
      Auction.methods.idListLength().call()
      .then((listLength) => {
        for (var i = 1; i <= listLength; i++) {
          Auction.methods.favours(i).call().then(favour => {
            console.log(favour)
            favourTemplate.find('img').attr('src', favour.imgUrl);
            favourTemplate.find('.favour-payAmount').text(web3.utils.fromWei(favour.currentPayAmount, "ether") + " ETH");
            favourTemplate.find('.panel-title').text(favour.description);
            favourTemplate.find('.favour-location').text(favour.location);
            favourTemplate.find('.favour-difficulty').text(favour.difficulty);
            favourTemplate.find('.favour-time').text(favour.time);
            favourTemplate.find('.favour-pay-btn').attr("data-id", favour.favourId);
            favourTemplate.find('.favour-pay-btn').attr("data-currentpayamount", favour.currentPayAmount);

            if (favour.beneficiary !== '0x0000000000000000000000000000000000000000') {
              console.log(favourTemplate.find('.favour-pay-btn'))
              favourTemplate.find('.favour-pay-btn').text("Success").attr('disabled', true)
            } else {
              favourTemplate.find('.favour-pay-btn').text("Pay").attr('disabled', false)
            }

          favourRow.append(favourTemplate.html());
          })}})
          return App.bindEvents();
        },
        bindEvents: function() {
          $(document).on('click', '.favour-pay-btn', App.payFavour);
        },
        payFavour: async function (e) {
          e.preventDefault();

          var web3 = new Web3(window.ethereum);
          const favourId = parseInt($(e.target).data('id'));
          const payAmount = String($(e.target).data('currentpayamount'));
          console.log(payAmount)

          

          // instantiate smart contract instance
          const Auction = new web3.eth.Contract(raABI, raAddress)
          Auction.setProvider(window.ethereum)

          Auction.methods.addAsBeneficiary(
            favourId,
          ).send( {
              from: ethereum.selectedAddress,
              value: payAmount,
            }).then(e => {alert("Success"); location.reload();}).catch(e => alert("Payment Failed"))

          
        }
  }


$(function() {
  $(window).load(function() {
    App.init();
  });
});

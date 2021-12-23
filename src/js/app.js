App = {
  web3Provider: null,
  contracts: {},
  init: async function() {
    // Load favours.
    $.getJSON('../favours.json', function(data) {
      var favourRow = $('#favourRow');
      var favourTemplate = $('#favourTemplate');

      for (i = 0; i < data.length; i ++) {
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
    
    return App.initContract();
    
  },



  initContract: function() {
    $.getJSON('Auction.json', function(data) {
      // Get the necessary contract artifact file and instantiate it with @truffle/contract
      var AuctionArtifact = data;
      App.contracts.Auction = TruffleContract(AuctionArtifact);
    
      // Set the provider for our contract
      App.contracts.Auction.setProvider(App.web3Provider);
    
      // Use our contract to retrieve and mark the paid favours
      return App.markPaid();
    });

    return App.bindEvents();
  },

  bindEvents: function() {
    $(document).on('click', '.btn-pay', App.handlePay);
  },

  markPaid: function() {
    var payInstance;

    App.contracts.Auction.deployed().then(function(instance) {
      payInstance = instance;
    
      return payInstance.getBeneficiaries.call();
    }).then(function(beneficiaries) {
      for (i = 0; i < beneficiaries.length; i++) {
        if (beneficiaries[i] !== '0x0000000000000000000000000000000000000000') {
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

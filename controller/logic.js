const ethUtil = require("ethereumjs-util");
const Web3 = require("web3");
const abi = require("./abi");
const fetchEvents = require("./fetchEvent");
var ethereumTransaction = require('ethereumjs-tx').Transaction;
var converter = require('hex2dec');
 

const web3 = new Web3(
  new Web3.providers.HttpProvider(
    "https://ropsten.infura.io/v3/f62fc53d566a4925b0c32df253efa0ab"
  )
);

let privateKeyBuffer = Buffer.from(
  "3033980bc6b90bf92d3dd3546b7cc9c45b0b9a94d8352bd7ea9f1e835dc52daa",
  "hex"
);

let address = "0x" + ethUtil.privateToAddress(privateKeyBuffer).toString("hex");

var insurranceContract = web3.eth.contract(abi);
var inssurance = insurranceContract.at(
  "0x4ea003d39afc1a7dc3dd7be767ec5b8cbf282aed"
);

function sendTransactionToSmartContract(serializedTransaction) {
  return new Promise((resolve, reject) => {
    web3.eth.sendRawTransaction(
      "0x" + serializedTransaction.toString("hex"),
      function(err, hash) {
        if (!err) {
          console.log(hash);
          resolve(hash);
        } else {
          console.log(err);
          reject(err);
        }
      }
    );
  });
}

function getGasPrice() {
  return new Promise((resolve, reject) => {
    web3.eth.getGasPrice(function (error, response) {
      if (error) {
        reject(console.log(error))
      }
      resolve(response.c)
    })
  })
}

async function transaction(dataField) {
	let gasPrice = await getGasPrice()
    let gasPriceHex = web3.toHex(gasPrice*3);
    let nonce = web3.eth.getTransactionCount(address);
    let nonceHex = web3.toHex(nonce);
    const transactionParams = {
    from: address,
    nonce: nonceHex,
    gasPrice: gasPriceHex,
    gasLimit: web3.toHex(300000),
    to: "0x4ea003d39afc1a7dc3dd7be767ec5b8cbf282aed",
    value: "0x0",
    data: dataField,
    chainId: 3
  };
  var transaction = new ethereumTransaction(transactionParams, { chain: 'ropsten', hardfork: 'petersburg' });
  transaction.sign(privateKeyBuffer);
  const serializedTransaction = transaction.serialize();
  // console.log(serializedTransaction);
  let hash = await sendTransactionToSmartContract(serializedTransaction);
  return hash;
}


async function eventsFetch(byteData, cb) {
  let hash = await transaction(byteData);
  let id;
  let interval = setInterval(async function () {
    if (hash != null && hash != undefined) {
      let receipt = await web3.eth.getTransactionReceipt(hash);
      if (receipt != undefined && receipt != null){
        result = await fetchEvents(web3.toHex(0), web3.toHex('latest'), '0x4ea003d39afc1a7dc3dd7be767ec5b8cbf282aed', "https://ropsten.infura.io/v3/f62fc53d566a4925b0c32df253efa0ab");
        id = converter.hexToDec(result[result.length-1].topics[2]);
        // console.log("@@@@@@", id);
        cb(id);
        clearInterval(interval);
        
      }
      else
        console.log('Transaction not confirmed');  
     
    }
  }, 2000);
}
async function purchage(customer, issuer, product, cost, issue_date, end_date, premium_amount, cover_amount, cb) {
	var dt1 = new Date( issue_date );
  var dt2 = new Date( end_date );
  // console.log("issuedate:", (dt1.getTime())/1000.0, (dt2.getTime())/1000.0);
	let buyInssuranceData =  inssurance.buyInssurance.getData(customer, issuer, product, parseInt(cost), (dt1.getTime())/1000.0, (dt2.getTime())/1000.0, parseInt(premium_amount), parseInt(cover_amount));
  await eventsFetch(buyInssuranceData, cb);
}

async function file_FIR(inssuranceId, cb) {
  let file_FIR_data =  inssurance.fileFIR.getData(parseInt(inssuranceId));
  await eventsFetch(file_FIR_data, cb);
}

async function claim_request(inssuranceId, fir, cb) {
  let claim_request_data =  inssurance.claimRequest.getData(parseInt(inssuranceId), parseInt(fir));
  await eventsFetch(claim_request_data, cb);
}

async function verification_request(inssuranceId, fir, cb) {
  let verification_request_data =  inssurance.verificationRequest.getData(parseInt(inssuranceId), parseInt(fir));
  await eventsFetch(verification_request_data, cb);
}

async function policeVerification(inssuranceId, fir, cb) {
  let verification_data =  inssurance.policeVerification.getData(parseInt(fir), parseInt(inssuranceId));
  await eventsFetch(verification_data, cb);
}

async function filterEvent(action, cb) {
  result = await fetchEvents(web3.toHex(0), web3.toHex('latest'), '0x4ea003d39afc1a7dc3dd7be767ec5b8cbf282aed', "https://ropsten.infura.io/v3/f62fc53d566a4925b0c32df253efa0ab");
  // console.log("!!!!!!!!!!!!!!!", result, result.length);
  data = [];
  if(action == 'claim_requests') {
    for(let i = 0; i<result.length;i++) {
      if(result[i].topics[0] == '0xc0cf3abb0375e1170945107332970afe254738c357e92d77468ac4d8a8430402') {
        request = {
          'customer': `0x${result[i].topics[1].slice(26,66)}`,
          'id': converter.hexToDec(result[i].topics[2]),
          'fir': converter.hexToDec(result[i].topics[3])
        }
        // console.log()
        // console.log("data is: ",request);
        data.push(request);
      }
    }
    
  }
  else if(action == 'verification_requests') {
    for(let i = 0; i<result.length;i++) {
      if(result[i].topics[0] == '0xd36b589ba9bb78cab8b4ec1c54fd2f1286eabd9a7b785772ac131658bf027642') {
        // console.log(result[i]);
        var myDate = new Date( converter.hexToDec(result[i].data.slice(130, 194)) *1000);
        var hexCustomer  = result[i].data.slice(258, 322).toString();
        var customer = '';
        for (var n = 0; n < hexCustomer.length; n += 2) {
          customer += String.fromCharCode(parseInt(hexCustomer.substr(n, 2), 16));
        }

        var hexProduct  = result[i].data.slice(386, 450).toString();
        var product = '';
        for (var n = 0; n < hexProduct.length; n += 2) {
          product += String.fromCharCode(parseInt(hexProduct.substr(n, 2), 16));
        }
        // console.log("@@@@@@@@@@@@@@",product)
        request = {
          'id': converter.hexToDec(result[i].topics[1]),
          'fir': converter.hexToDec(result[i].topics[2]),
          "Customer":customer,
          "Product": product,
          'End_Date': myDate
        }
        data.push(request);
      }
    }
  }
  cb(data);
}
module.exports = {purchage, file_FIR, claim_request, verification_request, policeVerification, filterEvent};

const axios = require('axios');
const Web3 = require("web3");
const web3 = new Web3(
    new Web3.providers.HttpProvider(
      "https://ropsten.infura.io/v3/f62fc53d566a4925b0c32df253efa0ab"
    )
);
//method to fetch all the vents corresponding to specific address from block 0 to latest
const fetchEvents = async function (fromBlock, toBlock,  address, url) {
  const requestData = {
    id:1,
    jsonrpc: "2.0",
    method: "eth_getLogs",
    params: [
      {
        fromBlock: fromBlock,
        toBlock: toBlock,
        address,
      }
    ],
  };

  const response = await axios.post(url, requestData);
 
  return response.data.result;
};

module.exports =  fetchEvents;
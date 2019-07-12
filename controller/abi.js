const abi = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "_customer",
				"type": "string"
			},
			{
				"name": "_issuer",
				"type": "string"
			},
			{
				"name": "_product",
				"type": "string"
			},
			{
				"name": "_cost",
				"type": "uint256"
			},
			{
				"name": "_issue_date",
				"type": "uint256"
			},
			{
				"name": "_end_date",
				"type": "uint256"
			},
			{
				"name": "_premium_amount",
				"type": "uint256"
			},
			{
				"name": "_cover_cost",
				"type": "uint256"
			}
		],
		"name": "buyInssurance",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_id",
				"type": "uint256"
			},
			{
				"name": "_firNo",
				"type": "uint256"
			}
		],
		"name": "claimRequest",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "fileFIR",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_fir",
				"type": "uint256"
			},
			{
				"name": "_inssuranceId",
				"type": "uint256"
			}
		],
		"name": "policeVerification",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_id",
				"type": "uint256"
			},
			{
				"name": "_firNo",
				"type": "uint256"
			}
		],
		"name": "verificationRequest",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "customer",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "InsurranceIssued",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "customer",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": true,
				"name": "fir",
				"type": "uint256"
			}
		],
		"name": "CLaimRequested",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": true,
				"name": "fir",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "customer",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "product",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "end_date",
				"type": "uint256"
			}
		],
		"name": "VerificationRequested",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": true,
				"name": "fir",
				"type": "uint256"
			}
		],
		"name": "Verified",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": true,
				"name": "fir",
				"type": "uint256"
			}
		],
		"name": "FIRFiled",
		"type": "event"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "getClaimRequest",
		"outputs": [
			{
				"name": "",
				"type": "address"
			},
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "getInssurance",
		"outputs": [
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "getVerificationRequest",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
]

module.exports = abi;
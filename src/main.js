const {Blockchain, Transaction} = require('./blockchain');
const EC = require('elliptic').ec; // Install elliptic with "npm install elliptic"
const ec = new EC('secp256k1');


const myKey = ec.keyFromPrivate('c57cb09c27a213086ad99fc487ce9cb789b6a6cfb6af3ea62b34fba1615584b0');
const myWalletAddress = myKey.getPublic('hex');


let chaepyCoin = new Blockchain();



// Some Transaction tests

const tx1 = new Transaction(myWalletAddress, 'public key of toAddress', 10);
tx1.signTransaction(myKey);
chaepyCoin.addTransaction(tx1);

chaepyCoin.minePendingTransactions(myWalletAddress);

console.log("\nBalance of Jonas is ", chaepyCoin.getBalanceOfAddress(myWalletAddress));
console.log("Is chain valid?", chaepyCoin.isChainValid());

chaepyCoin.chain[1].transactions[0].amount = 1; // try to manipulate the chain

console.log("Is chain valid?", chaepyCoin.isChainValid());

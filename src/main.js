const {Blockchain, Transaction} = require('./blockchain');
const EC = require('elliptic').ec; // Install elliptic with "npm install elliptic"
const ec = new EC('secp256k1');




let chaepyCoin = new Blockchain();

const myKey = ec.keyFromPrivate('406f57382cdcf73af3a1330cbca3875595a0793ca0de5baa8bdf95e420e4f031');
const myWalletAddress = myKey.getPublic('hex');

// Some Transaction tests

const tx1 = new Transaction(myWalletAddress, 'chaepy', 10);
tx1.signTransaction(myKey);
chaepyCoin.addTransaction(tx1);

chaepyCoin.minePendingTransactions(myWalletAddress);

const tx2 = new Transaction(myWalletAddress, 'chaepy', 25);
tx2.signTransaction(myKey);
chaepyCoin.addTransaction(tx2);

chaepyCoin.minePendingTransactions(myWalletAddress);
const tx3 = new Transaction(myWalletAddress, 'chaepy', 10);
tx3.signTransaction(myKey);
chaepyCoin.addTransaction(tx3);
chaepyCoin.minePendingTransactions(myWalletAddress);



console.log(chaepyCoin);
console.log(tx1);
console.log("");
console.log("\nBalance of Chaepy is ", chaepyCoin.getBalanceOfAddress("chaepy"));
console.log("\nBalance of Jonas is ", chaepyCoin.getBalanceOfAddress(myWalletAddress));
console.log("Is chain valid?", chaepyCoin.isChainValid());

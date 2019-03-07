# Basic Blockchain Demo
This is a Blockchain demo, which can add transactions, have mining rewards, use proof-of-work and signing the transactions.
## Quick Guide
#### Create Keys
```
~$ node keygenerator.js

Private key: [YOUR PRIVATE KEY IS HERE]

Public key: [YOUR PUBLIC KEY IS HERE]
```
#### Create Transaction
main.js:
```
const myKey = ec.keyFromPrivate('[PASTE YOUR PRIVATE KEY HERE]');
const myWalletAddress = myKey.getPublic('hex');

const tx1 = new Transaction(myWalletAddress, 'public key of toAddress', [AMOUNT]);
tx1.signTransaction(myKey);
chaepyCoin.addTransaction(tx1);
```
#### Mine a Block in the chain
main.js:
```
chaepyCoin.minePendingTransactions(myWalletAddress);
```
#### Check if Blockchain is Valid 
main.js:
```
console.log("Is chain valid?", chaepyCoin.isChainValid());
```
### Start Blockchain
```
~$ node main.js
```
## Requirements
- NodeJS
- crypto-js (`npm install crypto-js`)
- elliptic (`npm install elliptic`)
## Contact
Email: contact@chaepy.net\
Website: https://chaepy.net/ 
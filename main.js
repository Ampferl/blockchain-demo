const SHA256 = require('crypto-js/sha256'); // Install with "npm install crypto-js"

class Transaction{
	constructor(fromAddress, toAddress, amount){
		this.fromAddress = fromAddress;
		this.toAddress = toAddress;
		this.amount = amount;
	}
}

class Block{
	constructor(timestamp, transactions, previousHash = ''){
		this.timestamp = timestamp;
		this.transactions = transactions;
		this.previousHash = previousHash;
		this.hash = this.calculateHash();
		this.nonce = 0;
	}
	
	calculateHash(){
		return SHA256(this.previousHash + this.timestamp + JSON.stringify(this.transactions) + this.nonce).toString();
	}
	
	mineBlock(difficulty){
		while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")){
			this.nonce++;
			this.hash = this.calculateHash();
		}
		
		console.log("Block mined: " + this.hash);
	}
}


class Blockchain{
	constructor(){
		this.chain = [this.createGenesisBlock()];
		this.difficulty = 2; // Here you can set the difficulty to mine a Block
		this.pendingTransactions = [];
		this.miningReward = 100; // Here you can set the Reward for mining a Block
	}
	
	createGenesisBlock(){
		return new Block("01/01/2019", "Genesis block", "0");
	}
	
	getLatestBlock(){
		return this.chain[this.chain.length - 1];
	}
	
	minePendingTransactions(miningRewardAddress){
		let block = new Block(Date.now(), this.pendingTransactions);
		block.mineBlock(this.difficulty);
		
		console.log("Block successfully mined!");
		this.chain.push(block);
		
		this.pendingTransactions = [
			new Transaction(null, miningRewardAddress, this.miningReward)
		];
	}
	
	createTransaction(transaction){
		this.pendingTransactions.push(transaction);
	}
	
	getBalanceOfAddress(address){
		let balance = 0;
		
		for(const block of this.chain){
			for(const trans of block.transactions){
				if(trans.fromAddress === address){
					balance -= trans.amount;
				}
				
				if(trans.toAddress === address){
					balance += trans.amount;
				}
			}
		}
		
		return balance;
	}
	
	isChainValid(){
		for(let i = 1; i < this.chain.length; i++){
			const currentBlock = this.chain[i];
			const previousBlock = this.chain[i - 1];
			
			if(currentBlock.hash !== currentBlock.calculateHash()){
				return false;
			}
			
			if(currentBlock.previousHash !== previousBlock.hash){
				return false;
			}
		}
		
		return true;
	}
}

let chaepyCoin = new Blockchain();


// Some Transaction tests
chaepyCoin.createTransaction(new Transaction('chaepy', 'jonas', 100));
chaepyCoin.createTransaction(new Transaction('jonas', 'chaepy', 50));
chaepyCoin.minePendingTransactions('jonas');

chaepyCoin.createTransaction(new Transaction('chaepy', 'jonas', 10));
chaepyCoin.minePendingTransactions('chaepy');

console.log("Balance of Jonas is ", chaepyCoin.getBalanceOfAddress('jonas'));
console.log("Balance of Chaepy is ", chaepyCoin.getBalanceOfAddress('chaepy'));

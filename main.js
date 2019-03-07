const SHA256 = require('crypto-js/sha256'); // Install with "npm install crypto-js"

class Block{
	constructor(index, timestamp, data, previousHash = ''){
		this.index = index;
		this.timestamp = timestamp;
		this.data = data;
		this.previousHash = previousHash;
		this.hash = this.calculateHash();
		this.nonce = 0;
	}
	
	calculateHash(){
		return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
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
		this.difficulty = 2; // Here you can set the difficulty
	}
	
	createGenesisBlock(){
		return new Block(0, "01/01/2019", "Genesis block", "0");
	}
	
	getLatestBlock(){
		return this.chain[this.chain.length - 1];
	}
	
	addBlock(newBlock){
		newBlock.previousHash = this.getLatestBlock().hash;
		newBlock.mineBlock(this.difficulty);
		this.chain.push(newBlock);
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

// Here we create new Blocks
chaepyCoin.addBlock(new Block(1, "01/03/2019", { amount: 4})); 
chaepyCoin.addBlock(new Block(2, "04/03/2019", { amount: 6}));
chaepyCoin.addBlock(new Block(3, "07/03/2019", { amount: 2}));


//console.log('Is blockchain valid? ' + chaepyCoin.isChainValid()); // Show if Block is valid

//console.log(JSON.stringify(chaepyCoin, null, 4)); // Show the Blockchain
/* eslint-env node */

const Web3 = require('web3');
const CooContract = require('./abi/COO.json');

class Coojs {
  constructor(provider) {
    this.web3 = new Web3(provider);

    const contractAbi = CooContract.abi;
    const contractAddress = CooContract.networks['3'].address;

    this.instance = new this.web3.eth.Contract(contractAbi, contractAddress);
  }

  getInstance() {
    return this.instance;
  }
}

module.exports = Coojs;

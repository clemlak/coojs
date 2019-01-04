/* eslint-env node */

const Web3 = require('web3');
const CooContract = require('./abi/COO.json');

class Coojs {
  constructor(provider, publicKey, privateKey) {
    this.web3 = new Web3(provider);

    this.publicKey = publicKey;
    this.privateKey = privateKey;

    this.contractAbi = CooContract.abi;
    this.contractAddress = CooContract.networks['3'].address;

    this.instance = new this.web3.eth.Contract(this.contractAbi, this.contractAddress);
  }

  getInstance() {
    return this.instance;
  }

  createCertificate(
    assetId,
    name,
    label,
    price,
    timestamp,
    factomEntryHash,
    anotherEncryptionKey,
  ) {
    const data = this.instance.methods.createCertificate({
      assetId,
      name,
      label,
      price,
      timestamp,
      factomEntryHash,
      anotherEncryptionKey,
    }).encodeABI();

    const tx = {
      from: this.publicKey,
      to: this.contractAddress,
      data,
      gasPrice: this.web3.utils.toWei('5', 'gwei'),
      gas: '4000000',
    };

    return this.web3.eth.accounts.signTransaction(tx, this.privateKey)
      .then(transaction => this.web3.eth.sendSignedTransaction(transaction.rawTransaction))
      .then((receipt) => {
        console.log(receipt);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = Coojs;

/* eslint-env mocha */

const assert = require('assert');
const Coojs = require('../index.js');

const provider = 'https://ropsten.infura.io/JHsRSUXVUlcgCpl29o20';
const contractAddress = '0x14Fb1D46EDcC168c751dfa5B4ee473C52cFaB63F';

describe('coojs', () => {
  const coojs = new Coojs(provider);

  it('Should create a new contract instance', () => {
    assert.equal(coojs.getInstance().options.address, contractAddress);
  });
});

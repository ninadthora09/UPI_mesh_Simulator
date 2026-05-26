const crypto = require('crypto');

const Transaction = require('../models/Transaction');

async function claimPacket(ciphertext) {

  const hash = crypto
    .createHash('sha256')
    .update(ciphertext)
    .digest('hex');

  const existing = await Transaction.findOne({
    packetHash: hash
  });

  if (existing) {

    return {
      claimed: false,
      hash
    };
  }

  return {
    claimed: true,
    hash
  };
}

async function reset() {

  await Transaction.deleteMany({});
}

module.exports = {
  claimPacket,
  reset
};
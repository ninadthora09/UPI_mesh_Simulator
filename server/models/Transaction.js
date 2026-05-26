const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  packetHash: {
    type: String,
    unique: true,
    required: true
  },

  sender: String,
  receiver: String,
  amount: Number,

  bridgeNodeId: String,

  settledAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model(
  'Transaction',
  transactionSchema
);
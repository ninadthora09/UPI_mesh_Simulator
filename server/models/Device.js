const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema({
  deviceId: {
    type: String,
    unique: true,
    required: true
  },

  hasInternet: {
    type: Boolean,
    default: false
  },

  packets: {
    type: Array,
    default: []
  }
});

module.exports = mongoose.model(
  'Device',
  deviceSchema
);
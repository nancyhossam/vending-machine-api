const mongoose = require('mongoose');

const vendingMachineSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  location: {
    address: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    }
  },
  installedAt: {
    type: Date,
    default: Date.now
  },
}, {
  timestamps: true
});

vendingMachineSchema.index({ name: 'text', 'location.city': 'text' });

module.exports = mongoose.model('VendingMachine', vendingMachineSchema);

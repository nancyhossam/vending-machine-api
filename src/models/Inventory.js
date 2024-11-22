const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  vendingMachineId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'VendingMachine',
    required: true
  },
  itemName: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  quantity: {
    type: Number,
    required: true,
    min: 0
  }
}, {
  timestamps: true
});


inventorySchema.index({ itemName: 'text', price: 1 });

module.exports = mongoose.model('Inventory', inventorySchema);

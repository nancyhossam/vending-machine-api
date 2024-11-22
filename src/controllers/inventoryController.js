const Inventory = require('../models/Inventory');

const inventoryController = {
  // Get inventory for a specific vending machine
  getMachineInventory: async (req, res) => {
    try {
      const {
        page = 1,
        limit = 10,
        sortBy,
        sortOrder = 'asc',
        itemName,
        minPrice,
        maxPrice
      } = req.query;

      const query = { vendingMachineId: req.params.machineId };

      // Apply filters
      if (itemName) query.itemName = new RegExp(itemName, 'i');
      if (minPrice || maxPrice) {
        query.price = {};
        if (minPrice) query.price.$gte = parseFloat(minPrice);
        if (maxPrice) query.price.$lte = parseFloat(maxPrice);
      }

      // Create sort object
      const sort = {};
      if (sortBy) {
        sort[sortBy] = sortOrder === 'desc' ? -1 : 1;
      }

      const inventory = await Inventory.find(query)
        .sort(sort)
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();

      const count = await Inventory.countDocuments(query);

      res.json({
        inventory,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
        totalItems: count
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Add new inventory item
  addInventoryItem: async (req, res) => {
    try {
      const item = new Inventory({
        ...req.body,
        vendingMachineId: req.params.machineId
      });
      const savedItem = await item.save();
      res.status(201).json(savedItem);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Update inventory item
  updateInventoryItem: async (req, res) => {
    try {
      const item = await Inventory.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      if (!item) {
        return res.status(404).json({ message: 'Inventory item not found' });
      }
      res.json(item);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Delete inventory item
  deleteInventoryItem: async (req, res) => {
    try {
      const item = await Inventory.findByIdAndDelete(req.params.id);
      if (!item) {
        return res.status(404).json({ message: 'Inventory item not found' });
      }
      res.json({ message: 'Inventory item deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = inventoryController;

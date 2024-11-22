const VendingMachine = require('../models/VendingMachine');

const vendingMachineController = {
  getAllMachines: async (req, res) => {
    try {
      const {
        page = 1,
        limit = 10,
        name,
        city,
        startDate,
        endDate,
        sortBy,
        sortOrder = 'asc'
      } = req.query;

      const query = {};

      if (name) query.name = new RegExp(name, 'i');
      if (city) query['location.city'] = new RegExp(city, 'i');
      if (startDate || endDate) {
        query.installedAt = {};
        if (startDate) query.installedAt.$gte = new Date(startDate);
        if (endDate) query.installedAt.$lte = new Date(endDate);
      }

      const sort = {};
      if (sortBy) {
        sort[sortBy] = sortOrder === 'desc' ? -1 : 1;
      }

      const machines = await VendingMachine.find(query)
        .sort(sort)
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();

      const count = await VendingMachine.countDocuments(query);

      res.json({
        machines,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
        totalItems: count
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Create a new vending machine
  createMachine: async (req, res) => {
    try {
      const machine = new VendingMachine(req.body);
      const savedMachine = await machine.save();
      res.status(201).json(savedMachine);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Get a single vending machine by ID
  getMachine: async (req, res) => {
    try {
      const machine = await VendingMachine.findById(req.params.id);
      if (!machine) {
        return res.status(404).json({ message: 'Vending machine not found' });
      }
      res.json(machine);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Update a vending machine
  updateMachine: async (req, res) => {
    try {
      const machine = await VendingMachine.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      if (!machine) {
        return res.status(404).json({ message: 'Vending machine not found' });
      }
      res.json(machine);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Delete a vending machine
  deleteMachine: async (req, res) => {
    try {
      const machine = await VendingMachine.findByIdAndDelete(req.params.id);
      if (!machine) {
        return res.status(404).json({ message: 'Vending machine not found' });
      }
      res.json({ message: 'Vending machine deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = vendingMachineController;

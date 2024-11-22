const mongoose = require('mongoose');
const VendingMachine = require('../models/VendingMachine');
const Inventory = require('../models/Inventory');
require('dotenv').config();

const vendingMachines = [
  {
    name: "Snack Master 2000",
    location: {
      address: "123 Main St",
      city: "New York"
    },
    status: "active"
  },
  {
    name: "Drink Station Pro",
    location: {
      address: "456 Park Avenue",
      city: "Los Angeles"
    },
    status: "active"
  },
  {
    name: "Healthy Bites Vendor",
    location: {
      address: "789 Health Blvd",
      city: "San Francisco"
    },
    status: "active"
  },
  {
    name: "Campus Refreshments",
    location: {
      address: "321 University Way",
      city: "Boston"
    },
    status: "maintenance"
  },
  {
    name: "Office Break Room",
    location: {
      address: "555 Corporate Plaza",
      city: "Chicago"
    },
    status: "active"
  },
  {
    name: "Metro Station Express",
    location: {
      address: "444 Transit Center",
      city: "Washington DC"
    },
    status: "inactive"
  }
];

const inventoryItems = [
  {
    itemName: "Cola Classic",
    price: 1.50,
    quantity: 20
  },
  {
    itemName: "Diet Cola",
    price: 1.50,
    quantity: 15
  },
  {
    itemName: "Mineral Water",
    price: 1.00,
    quantity: 25
  },
  {
    itemName: "Potato Chips",
    price: 1.25,
    quantity: 30
  },
  {
    itemName: "Chocolate Bar",
    price: 2.00,
    quantity: 18
  },
  {
    itemName: "Energy Drink",
    price: 2.50,
    quantity: 12
  },
  {
    itemName: "Trail Mix",
    price: 1.75,
    quantity: 22
  },
  {
    itemName: "Granola Bar",
    price: 1.25,
    quantity: 28
  },
  {
    itemName: "Fresh Sandwich",
    price: 4.50,
    quantity: 8
  },
  {
    itemName: "Fruit Juice",
    price: 2.00,
    quantity: 16
  },
  {
    itemName: "Protein Bar",
    price: 3.00,
    quantity: 15
  },
  {
    itemName: "Mixed Nuts",
    price: 2.25,
    quantity: 20
  },
  {
    itemName: "Candy Pack",
    price: 1.75,
    quantity: 25
  },
  {
    itemName: "Sparkling Water",
    price: 1.50,
    quantity: 18
  },
  {
    itemName: "Green Tea",
    price: 2.00,
    quantity: 14
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    
    await VendingMachine.deleteMany({});
    await Inventory.deleteMany({});
    
    const machines = await VendingMachine.insertMany(vendingMachines);
    
    const inventoryWithMachineIds = inventoryItems.map((item, index) => ({
      ...item,
      vendingMachineId: machines[index % machines.length]._id
    }));
    
    await Inventory.insertMany(inventoryWithMachineIds);
    
    console.log('Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const errorHandler = require('./middleware/errorHandler');
const vendingMachineRoutes = require('./routes/vendingMachineRoutes');
const inventoryRoutes = require('./routes/inventoryRoutes');

const app = express();

// Security middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100 
});
app.use(limiter);

// Routes
app.use('/api/vending-machines', vendingMachineRoutes);
app.use('/api/inventory', inventoryRoutes);

// Error handling
app.use(errorHandler);

module.exports = app;
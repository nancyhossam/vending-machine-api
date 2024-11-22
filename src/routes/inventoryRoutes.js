const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');
const { validateInventory } = require('../middleware/validation');
const { adminAuth } = require('../middleware/auth');

router.get('/:machineId', adminAuth, inventoryController.getMachineInventory);
router.post('/:machineId', adminAuth, validateInventory, inventoryController.addInventoryItem);
router.put('/:id', adminAuth, validateInventory, inventoryController.updateInventoryItem);
router.delete('/:id', adminAuth, inventoryController.deleteInventoryItem);

module.exports = router;
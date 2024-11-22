const express = require('express');
const router = express.Router();
const vendingMachineController = require('../controllers/vendingMachineController');
const { validateVendingMachine } = require('../middleware/validation');
const { auth } = require('../middleware/auth');

router.get('/', auth, vendingMachineController.getAllMachines);
router.post('/', auth, validateVendingMachine, vendingMachineController.createMachine);
router.get('/:id', auth, vendingMachineController.getMachine);
router.put('/:id', auth, validateVendingMachine, vendingMachineController.updateMachine);
router.delete('/:id', auth, vendingMachineController.deleteMachine);

module.exports = router;
const Joi = require('joi');

const vendingMachineSchema = Joi.object({
  name: Joi.string().required(),
  location: Joi.object({
    address: Joi.string().required(),
    city: Joi.string().required()
  }).required(),
});

const inventorySchema = Joi.object({
  itemName: Joi.string().required(),
  price: Joi.number().min(0).required(),
  quantity: Joi.number().min(0).required()
});

const validateVendingMachine = (req, res, next) => {
  const { error } = vendingMachineSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

const validateInventory = (req, res, next) => {
  const { error } = inventorySchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

module.exports = {
  validateVendingMachine,
  validateInventory
};

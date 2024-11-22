const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const VendingMachine = require('../../src/models/VendingMachine');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('Vending Machine Model Test', () => {
  it('should create & save vending machine successfully', async () => {
    const validMachine = new VendingMachine({
      name: 'Test Machine',
      location: {
        address: '123 Test St',
        city: 'Test City'
      }
    });
    const savedMachine = await validMachine.save();
    
    expect(savedMachine._id).toBeDefined();
    expect(savedMachine.name).toBe(validMachine.name);
    expect(savedMachine.location.city).toBe(validMachine.location.city);
  });

  it('should fail to save vending machine without required fields', async () => {
    const machineWithoutRequiredField = new VendingMachine({
      name: 'Test Machine'
    });
    
    let err;
    try {
      await machineWithoutRequiredField.save();
    } catch (error) {
      err = error;
    }
    
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
  });
});
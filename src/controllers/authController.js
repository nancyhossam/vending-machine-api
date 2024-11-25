const User = require('../models/User');
const jwt = require('jsonwebtoken');

const authController = {
  // Register new user
  register: async (req, res) => {
    try {
      // Check if user already exists
      const existingUser = await User.findOne({ username: req.body.username });
      if (existingUser) {
        return res.status(400).json({ message: 'Username already exists' });
      }

      // Create new user
      const user = new User({
        username: req.body.username,
        password: req.body.password,
        isAdmin: req.body.isAdmin || false
      });

      await user.save();

      // Generate JWT token
      const token = jwt.sign(
        { 
          id: user._id, 
          isAdmin: user.isAdmin 
        },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      res.status(201).json({
        success: true,
        data: {
          userId: user._id,
          username: user.username,
          isAdmin: user.isAdmin,
          token
        }
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  },

  // Login user
  login: async (req, res) => {
    try {
      // Check if user exists
      const user = await User.findOne({ username: req.body.username });
      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Invalid credentials'
        });
      }

      // Check password
      const isMatch = await user.comparePassword(req.body.password);
      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: 'Invalid credentials'
        });
      }

      // Generate JWT token
      const token = jwt.sign(
        { 
          id: user._id, 
          isAdmin: user.isAdmin 
        },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      res.json({
        success: true,
        data: {
          userId: user._id,
          username: user.username,
          isAdmin: user.isAdmin,
          token
        }
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  },
};

module.exports = authController; 
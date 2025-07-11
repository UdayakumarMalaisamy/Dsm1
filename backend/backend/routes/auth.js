const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// Generate JWT token
const generateToken = (user) => {
  return jwt.sign(
    { 
      id: user._id,
      username: user.username,
      role: user.role 
    },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );
};

// Login route
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
      return res.status(400).json({ message: 'Please provide username and password' });
    }

    // Find user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Generate token
    const token = generateToken(user);

    // Return user data (without password)
    const userData = {
      id: user.userId || user._id.toString(),
      userId: user.userId,
      username: user.username,
      role: user.role,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      isTemporaryPassword: user.isTemporaryPassword,
      createdAt: user.createdAt,
      lastLogin: user.lastLogin
    };

    res.json({
      user: userData,
      token,
      needsPasswordChange: user.isTemporaryPassword
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Change password route
router.patch('/change-password', auth, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: 'Please provide current and new password' });
    }

    const user = await User.findById(req.user._id);
    
    // Verify current password
    const isCurrentPasswordValid = await user.comparePassword(currentPassword);
    if (!isCurrentPasswordValid) {
      return res.status(401).json({ message: 'Current password is incorrect' });
    }

    // Update password
    user.password = newPassword;
    user.isTemporaryPassword = false;
    await user.save();

    res.json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create user route (admin only)
router.post('/create-user', auth, async (req, res) => {
  try {
    console.log('Create user request received:', req.body);
    console.log('User from token:', req.user);
    
    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admin only.' });
    }

    const { username, role, email, firstName, lastName } = req.body;
    
    console.log('Received data:', { username, role, email, firstName, lastName });

    // Validate input
    if (!username || !role || !firstName || !lastName) {
      return res.status(400).json({ 
        message: 'Please provide all required fields',
        required: ['username', 'role', 'firstName', 'lastName']
      });
    }
    
    // Validate role
    const validRoles = ['admin', 'teacher', 'student', 'parent'];
    if (!validRoles.includes(role)) {
      return res.status(400).json({ 
        message: 'Invalid role provided',
        validRoles: validRoles
      });
    }

    // Check if username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ message: 'Username already exists' });
    }

    // Generate user ID and temporary password
    const generateUserId = async (role) => {
      const prefix = role.toUpperCase().substring(0, 3);
      let userId;
      let isUnique = false;
      
      while (!isUnique) {
        const randomNum = Math.floor(Math.random() * 9000) + 1000; // 4-digit number
        userId = `${prefix}${randomNum}`;
        const existingUser = await User.findOne({ userId });
        if (!existingUser) {
          isUnique = true;
        }
      }
      
      return userId;
    };

    const generateTempPassword = () => {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let password = '';
      for (let i = 0; i < 8; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return password;
    };

    const userId = await generateUserId(role);
    const temporaryPassword = generateTempPassword();

    // Create new user
    const newUser = new User({
      userId: userId,
      username,
      password: temporaryPassword,
      role,
      email,
      firstName,
      lastName,
      isTemporaryPassword: true
    });

    const savedUser = await newUser.save();

    // Return user data (without password hash)
    const userData = {
      userId: savedUser.userId,
      username: savedUser.username,
      role: savedUser.role,
      email: savedUser.email,
      firstName: savedUser.firstName,
      lastName: savedUser.lastName,
      isTemporaryPassword: savedUser.isTemporaryPassword,
      createdAt: savedUser.createdAt
    };

    console.log('User created successfully:', userData);
    
    res.status(201).json({
      message: 'User created successfully',
      user: userData,
      temporaryPassword
    });

  } catch (error) {
    console.error('Create user error:', error);
    console.error('Error details:', {
      name: error.name,
      code: error.code,
      keyValue: error.keyValue,
      message: error.message
    });
    
    // Handle specific MongoDB errors
    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      return res.status(409).json({ 
        message: `${field} already exists`,
        field: field,
        keyValue: error.keyValue
      });
    }
    
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ 
        message: 'Validation error',
        errors: errors
      });
    }
    
    res.status(500).json({ 
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// Get all users route (admin only)
router.get('/users', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admin only.' });
    }

    const users = await User.find({}, '-password').sort({ createdAt: -1 });
    
    // Map users to include proper id field
    const mappedUsers = users.map(user => ({
      id: user.userId || user._id.toString(),
      userId: user.userId,
      username: user.username,
      role: user.role,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      isTemporaryPassword: user.isTemporaryPassword,
      createdAt: user.createdAt,
      lastLogin: user.lastLogin
    }));
    
    res.json(mappedUsers);
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete user route (admin only)
router.delete('/users/:userId', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admin only.' });
    }

    const { userId } = req.params;
    const user = await User.findOne({ 
      $or: [
        { userId: userId },
        { _id: userId }
      ]
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.role === 'admin') {
      return res.status(403).json({ message: 'Cannot delete admin user' });
    }

    await User.findByIdAndDelete(user._id);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

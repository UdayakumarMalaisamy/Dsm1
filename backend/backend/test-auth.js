require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const jwt = require('jsonwebtoken');

const testAuth = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Find admin user
    const admin = await User.findOne({ username: 'admin' });
    if (!admin) {
      console.log('Admin user not found');
      return;
    }

    console.log('Admin user found:', {
      id: admin._id,
      username: admin.username,
      role: admin.role
    });

    // Generate token
    const token = jwt.sign(
      { 
        id: admin._id,
        username: admin.username,
        role: admin.role 
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    console.log('Generated token:', token);

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded token:', decoded);

    // Find user by decoded ID
    const verifiedUser = await User.findById(decoded.id);
    console.log('Verified user:', verifiedUser ? verifiedUser.username : 'Not found');

    process.exit(0);
  } catch (error) {
    console.error('Test error:', error);
    process.exit(1);
  }
};

testAuth();

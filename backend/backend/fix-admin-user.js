require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

const fixAdminUser = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Find admin user
    const adminUser = await User.findOne({ username: 'admin' });
    if (!adminUser) {
      console.log('Admin user not found');
      process.exit(1);
    }

    // Update admin user with proper userId
    adminUser.userId = 'ADM001';
    await adminUser.save();
    
    console.log('Admin user updated successfully with userId:', adminUser.userId);
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

fixAdminUser();

require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    
    console.log('Connected to MongoDB');

    // Check if admin user already exists
    const adminExists = await User.findOne({ username: 'admin' });
    
    if (adminExists) {
      console.log('Admin user already exists');
      process.exit(0);
    }

    // Create default admin user
    const adminUser = new User({
      userId: 'ADMIN001',
      username: 'admin',
      password: 'admin123',
      role: 'admin',
      email: 'admin@dsm.com',
      firstName: 'System',
      lastName: 'Administrator',
      isTemporaryPassword: false
    });

    await adminUser.save();
    console.log('Default admin user created successfully');
    console.log('Username: admin');
    console.log('Password: admin123');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();

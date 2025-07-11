require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

const checkUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    const users = await User.find({});
    console.log('Existing users in database:');
    users.forEach(user => {
      console.log(`- ID: ${user._id}, UserID: ${user.userId}, Username: ${user.username}, Role: ${user.role}`);
    });

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

checkUsers();

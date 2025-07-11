require('dotenv').config();
const axios = require('axios');

const testCreateUser = async () => {
  try {
    console.log('Testing backend create user functionality...');
    
    // First, login to get admin token
    console.log('1. Logging in as admin...');
    const loginResponse = await axios.post('http://localhost:5001/api/auth/login', {
      username: 'admin',
      password: 'admin123'
    });
    
    console.log('Login successful! Token received.');
    const token = loginResponse.data.token;
    
    // Now create a test user
    console.log('2. Creating test user...');
    const createUserResponse = await axios.post('http://localhost:5001/api/auth/create-user', {
      username: 'test.student',
      role: 'student',
      email: 'test@student.com',
      firstName: 'Test',
      lastName: 'Student'
    }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    console.log('User created successfully!');
    console.log('User ID:', createUserResponse.data.user.id);
    console.log('Temporary Password:', createUserResponse.data.temporaryPassword);
    
    // Test getting all users
    console.log('3. Getting all users...');
    const getUsersResponse = await axios.get('http://localhost:5001/api/auth/users', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    console.log('Total users:', getUsersResponse.data.length);
    
    console.log('✅ Backend is working correctly!');
    
  } catch (error) {
    console.error('❌ Backend test failed:', error.response?.data || error.message);
  }
};

testCreateUser();

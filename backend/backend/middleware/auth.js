const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    console.log('Auth middleware - Token received:', token ? 'Yes' : 'No');
    
    if (!token) {
      console.log('Auth middleware - No token provided');
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    console.log('Auth middleware - Verifying token with secret:', process.env.JWT_SECRET ? 'Secret exists' : 'No secret');
    
    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET is not defined');
      return res.status(500).json({ message: 'Server configuration error' });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Auth middleware - Decoded token:', decoded);
    
    const user = await User.findById(decoded.id);
    console.log('Auth middleware - User found:', user ? user.username : 'Not found');
    
    if (!user) {
      console.log('Auth middleware - User not found in database');
      return res.status(401).json({ message: 'Token is not valid' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error.message);
    res.status(401).json({ message: 'Token is not valid', error: error.message });
  }
};

module.exports = auth;

const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

const authMiddlware = asyncHandler(async (req, res, next) => {
  let token;
  if (req?.headers?.authorization?.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
    try {
      if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded?.id);
        req.user = user;
        next();
      }
    } catch (error) {
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  } else {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

const isAdmin = asyncHandler(async (req, res, next) => {
  const { email } = req.user;
  const adminUser = await User.findOne({ email });
  if (adminUser && adminUser.role !== 'admin') {
    res.status(401);
    throw new Error('Not authorized as an admin');
  } else {
    next();
  }
});

module.exports = { authMiddlware, isAdmin };

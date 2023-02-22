const mongoose = require('mongoose');
const User = require('../models/userModel');

const validateMongodbId = (id) => {
  const isValid = mongoose.Types.ObjectId.isValid(id);
  if (!isValid) throw new Error('Invalid ID');
};

module.exports = validateMongodbId;

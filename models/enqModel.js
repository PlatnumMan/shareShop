const mongoose = require('mongoose');

var enqSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  mobile: { type: String, required: true },
  comment: { type: String, required: true },
  status: {
    type: String,
    default: 'Submitted',
    enum: ['Submitted', 'In Progress', 'Contacted', 'Cancelled'],
  },
});

module.exports = mongoose.model('Enquiry', enqSchema);

const { default: mongoose } = require('mongoose');

const dbConnect = () => {
  try {
    mongoose.set('strictQuery', true);
    const conn = mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected`);
  } catch (error) {
    console.log(`Database Error: ${error.message}`);
  }
};

module.exports = dbConnect;

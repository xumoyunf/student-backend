// config/config.js
require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB bilan ulanish amalga oshdi');
  } catch (err) {
    console.error('MongoDB bilan ulanishda xatolik', err);
    process.exit(1);
  }
};

module.exports = connectDB;

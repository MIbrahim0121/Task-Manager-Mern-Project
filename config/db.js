const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const connectDB = async () => {
  try {
    const mongoURI = process.env.NODE_ENV === 'production' 
      ? process.env.MONGO_URL_PRODUCTION 
      : process.env.MONGO_URL;

    await mongoose.connect(mongoURI);
    console.log(`Connected to MongoDB: ${process.env.NODE_ENV === 'production' ? 'Production' : 'Local'}`);
  } catch (err) {
    console.log('MongoDB Connection Error:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
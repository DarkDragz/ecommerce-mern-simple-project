const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const db = mongoose.connect(process.env.MONGO_URI);
  } catch (error) {
    console.log("Error in DB connection:", error);
  }
};

module.exports = connectDB

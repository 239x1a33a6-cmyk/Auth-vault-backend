const mongoose = require("mongoose");

async function connectDB(MONGO_URI) {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB Connected Successfully!");
  } catch (err) {
    console.log("DB Connection error", err.message);
    process.exit(1);
  }
}
module.exports = connectDB;

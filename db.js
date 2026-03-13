const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://ranjum262_db_user:rifatAnjum@cluster0.teea9ao.mongodb.net/hospital_portal?retryWrites=true&w=majority&appName=Cluster0');
        console.log("✅ MongoDB Connected...");
  } catch (err) {
    console.error("❌ Database Connection Failed", err);
    process.exit(1); 
  }
};

module.exports = connectDB;
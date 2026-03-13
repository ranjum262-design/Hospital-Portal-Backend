const mongoose = require('mongoose');

// Hum process.env.MONGO_URI use karenge, agar nahi mila toh fallback ke liye string use karenge
const connectDB = async () => {
  try {
    const dbURI = process.env.MONGO_URI || 'mongodb+srv://ranjum262_db_user:rifatAnjum@cluster0.teea9ao.mongodb.net/hospital_portal?retryWrites=true&w=majority&appName=Cluster0';
    await mongoose.connect(dbURI);
    console.log("✅ MongoDB Connected...");
  } catch (err) {
    console.error("❌ Database Connection Failed", err);
    process.exit(1); 
  }
};

module.exports = connectDB;

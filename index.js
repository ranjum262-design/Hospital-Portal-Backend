const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const topicRoutes = require('./routes/topicRoutes');

const app = express();

// 1. Connect Database
connectDB();
app.use(cors({
  origin: 'http://localhost:4200',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use('/api/topics', topicRoutes);

const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes); 

const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));

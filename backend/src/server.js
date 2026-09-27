require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/db');
const apiRoutes = require('./routes/api');
const { seedDatabase } = require('./seed');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP', timestamp: new Date() });
});

// Mount API routes
app.use('/api', apiRoutes);

// Start server
const startServer = async () => {
  try {
    await connectDB();
    // Auto-seed default competition and demo users if empty
    await seedDatabase();

    app.listen(PORT, () => {
      console.log(`===============================================`);
      console.log(`🚀 Feedants Backend API Server running!`);
      console.log(`📡 URL: http://localhost:${PORT}`);
      console.log(`🎯 Health Check: http://localhost:${PORT}/health`);
      console.log(`🏆 Competition API: http://localhost:${PORT}/api/competitions/default`);
      console.log(`===============================================`);
    });
  } catch (error) {
    console.error('Failed to initialize server:', error);
    process.exit(1);
  }
};

startServer();

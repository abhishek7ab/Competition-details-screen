require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/db');
const apiRoutes = require('./routes/api');
const { seedDatabase } = require('./seed');

const app = express();
const PORT = process.env.PORT || 5000;

// Configure browser origins explicitly. Production must set CORS_ORIGINS to the
// frontend origin(s), separated by commas. Requests without an Origin header
// (such as server-to-server or command-line requests) are still allowed.
const defaultDevelopmentOrigins = ['http://localhost:8081', 'http://127.0.0.1:8081', 'http://localhost:19006'];
const configuredOrigins = process.env.CORS_ORIGINS
  ? process.env.CORS_ORIGINS.split(',').map((origin) => origin.trim()).filter(Boolean)
  : process.env.NODE_ENV === 'production'
    ? []
    : defaultDevelopmentOrigins;
const allowedOrigins = new Set(configuredOrigins);

app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.has(origin)) {
      return callback(null, true);
    }
    return callback(new Error('Origin is not allowed by CORS'));
  },
}));
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

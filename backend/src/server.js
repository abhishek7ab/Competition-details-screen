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
app.use(express.json({ limit: '100kb' }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP', timestamp: new Date() });
});

// Mount API routes
app.use('/api', apiRoutes);

// Return consistent JSON errors for malformed, oversized, and unexpected errors.
app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }
  if (error && error.type === 'entity.too.large') {
    return res.status(413).json({ success: false, message: 'Request body is too large. Maximum size is 100 KB.' });
  }
  if (error instanceof SyntaxError && error.status === 400 && 'body' in error) {
    return res.status(400).json({ success: false, message: 'Invalid JSON request body.' });
  }

  console.error('Unhandled request error:', error);
  return res.status(500).json({ success: false, message: 'Internal server error' });
});

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

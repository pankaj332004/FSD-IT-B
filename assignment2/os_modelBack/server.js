import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import { cpuSchedulingRoutes } from './routes/cpuScheduling.js';
import { memoryManagementRoutes } from './routes/memoryManagement.js';
import { diskSchedulingRoutes } from './routes/diskScheduling.js';

const app = express();
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
  optionsSuccessStatus: 200
}));

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.path}`);
  next();
});

// Error handling middleware
const errorHandler = (err, req, res, next) => {
  const timestamp = new Date().toISOString();
  console.error(`[${timestamp}] Error:`, err);

  const statusCode = err.statusCode || 500;
  const message = NODE_ENV === 'production' 
    ? 'Internal Server Error' 
    : err.message;

  res.status(statusCode).json({
    success: false,
    error: message,
    ...(NODE_ENV !== 'production' && { stack: err.stack })
  });
};

// Routes
app.use('/api/cpu-scheduling', cpuSchedulingRoutes);
app.use('/api/memory-management', memoryManagementRoutes);
app.use('/api/disk-scheduling', diskSchedulingRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy',
    timestamp: new Date().toISOString(),
    env: NODE_ENV
  });
});

// API info
app.get('/', (req, res) => {
  res.json({ 
    message: 'OS Model Backend API',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      cpuScheduling: '/api/cpu-scheduling',
      memoryManagement: '/api/memory-management',
      diskScheduling: '/api/disk-scheduling'
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found'
  });
});

// Error handling
app.use(errorHandler);

const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📝 Environment: ${NODE_ENV}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

export default app;

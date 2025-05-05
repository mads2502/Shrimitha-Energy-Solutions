// Vercel Serverless Function for API routes
import express from 'express';
import { createServer } from 'http';
import { registerRoutes } from '../server/routes.js';

// Initialize Express
const app = express();
app.use(express.json());

// Register all routes
registerRoutes(app).then(server => {
  console.log('Routes registered');
});

// Export for Vercel
export default app;
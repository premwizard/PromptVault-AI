import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { clerkMiddleware } from '@clerk/express';
import { PrismaClient } from '@prisma/client';
import { errorHandler } from './middleware/error';
import { requestIdMiddleware, requestLoggerMiddleware } from './middleware/request';
import { logger } from './utils/logger';

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

export const prisma = new PrismaClient();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(requestIdMiddleware);
app.use(requestLoggerMiddleware);

// Add Clerk middleware for authentication
app.use(clerkMiddleware());

// Basic health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Import and use routes (to be created)
// import apiRoutes from './routes';
// app.use('/api', apiRoutes);

// Global Error Handler
app.use(errorHandler);

app.listen(port, () => {
  logger.info(`Backend server running on http://localhost:${port}`);
});

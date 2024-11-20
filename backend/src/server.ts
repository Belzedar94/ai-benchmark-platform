import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import benchmarkRoutes from './routes/benchmarks';
import modelRoutes from './routes/models';
import categoryRoutes from './routes/categories';
import searchRoutes from './routes/search';
import authRoutes from './routes/auth';
import { authenticate } from './middleware/auth';
import { initCache, closeCache } from './services/cache';
import { specs } from './swagger';
import { monitorRequest } from './middleware/monitoring';
import { register } from './services/monitoring';

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(monitorRequest);

// API Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Basic health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Metrics endpoint
app.get('/metrics', async (req, res) => {
  try {
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
  } catch (err) {
    res.status(500).end(err);
  }
});

// Public routes
app.use('/api/auth', authRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/categories', categoryRoutes);

// Protected routes
app.use('/api/benchmarks', authenticate, benchmarkRoutes);
app.use('/api/models', authenticate, modelRoutes);

// Initialize cache
initCache().catch(console.error);

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  await closeCache();
  process.exit(0);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  console.log(`API Documentation available at http://localhost:${port}/api-docs`);
});
import express from 'express';
import cors from 'cors';
import benchmarkRoutes from './routes/benchmarks';
import modelRoutes from './routes/models';
import categoryRoutes from './routes/categories';
import searchRoutes from './routes/search';

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Basic health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// API routes
app.use('/api/benchmarks', benchmarkRoutes);
app.use('/api/models', modelRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/search', searchRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
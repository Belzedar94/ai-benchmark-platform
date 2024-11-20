import request from 'supertest';
import express from 'express';
import { PrismaClient } from '@prisma/client';
import benchmarkRoutes from '../../routes/benchmarks';

const app = express();
app.use(express.json());
app.use('/api/benchmarks', benchmarkRoutes);

describe('Benchmark Routes', () => {
  let prisma: jest.Mocked<PrismaClient>;

  beforeEach(() => {
    prisma = new PrismaClient() as jest.Mocked<PrismaClient>;
    jest.clearAllMocks();
  });

  describe('GET /api/benchmarks', () => {
    it('should return all benchmarks', async () => {
      const mockBenchmarks = [
        {
          id: 1,
          name: 'GLUE',
          description: 'General Language Understanding Evaluation',
          category: { id: 1, name: 'NLP' },
          scores: [],
        },
      ];

      (prisma.benchmark.findMany as jest.Mock).mockResolvedValue(mockBenchmarks);

      const response = await request(app).get('/api/benchmarks');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockBenchmarks);
    });

    it('should handle errors', async () => {
      (prisma.benchmark.findMany as jest.Mock).mockRejectedValue(new Error('Database error'));

      const response = await request(app).get('/api/benchmarks');

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: 'Failed to fetch benchmarks' });
    });
  });

  describe('GET /api/benchmarks/:id', () => {
    it('should return a single benchmark', async () => {
      const mockBenchmark = {
        id: 1,
        name: 'GLUE',
        description: 'General Language Understanding Evaluation',
        category: { id: 1, name: 'NLP' },
        scores: [],
      };

      (prisma.benchmark.findUnique as jest.Mock).mockResolvedValue(mockBenchmark);

      const response = await request(app).get('/api/benchmarks/1');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockBenchmark);
    });

    it('should return 404 for non-existent benchmark', async () => {
      (prisma.benchmark.findUnique as jest.Mock).mockResolvedValue(null);

      const response = await request(app).get('/api/benchmarks/999');

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: 'Benchmark not found' });
    });
  });

  describe('POST /api/benchmarks', () => {
    it('should create a new benchmark', async () => {
      const mockBenchmark = {
        id: 1,
        name: 'GLUE',
        description: 'General Language Understanding Evaluation',
        categoryId: 1,
        linkToPaper: 'https://example.com',
        methodologyOverview: 'Test methodology',
      };

      (prisma.benchmark.create as jest.Mock).mockResolvedValue(mockBenchmark);

      const response = await request(app)
        .post('/api/benchmarks')
        .send(mockBenchmark);

      expect(response.status).toBe(201);
      expect(response.body).toEqual(mockBenchmark);
    });

    it('should handle validation errors', async () => {
      const response = await request(app)
        .post('/api/benchmarks')
        .send({});

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: 'Invalid benchmark data' });
    });
  });
});
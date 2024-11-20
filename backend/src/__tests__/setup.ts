// Mock environment variables for testing
process.env.JWT_SECRET = 'test-secret';
process.env.REDIS_URL = 'redis://localhost:6379';
process.env.DATABASE_URL = 'file:./test.db';

// Mock Redis client
jest.mock('../services/cache', () => ({
  getFromCache: jest.fn(),
  setInCache: jest.fn(),
  clearCache: jest.fn(),
  initCache: jest.fn(),
  closeCache: jest.fn(),
}));

// Mock Prometheus metrics
jest.mock('../services/monitoring', () => ({
  httpRequestDuration: {
    observe: jest.fn(),
    labels: jest.fn().mockReturnThis(),
  },
  httpRequestTotal: {
    inc: jest.fn(),
    labels: jest.fn().mockReturnThis(),
  },
  cacheHits: {
    inc: jest.fn(),
    labels: jest.fn().mockReturnThis(),
  },
  cacheMisses: {
    inc: jest.fn(),
    labels: jest.fn().mockReturnThis(),
  },
  authenticationAttempts: {
    inc: jest.fn(),
    labels: jest.fn().mockReturnThis(),
  },
  register: {
    metrics: jest.fn(),
    contentType: 'text/plain',
  },
}));

// Mock Prisma
jest.mock('@prisma/client', () => ({
  PrismaClient: jest.fn().mockImplementation(() => ({
    benchmark: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
    },
    model: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
    },
    category: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
    },
    user: {
      findUnique: jest.fn(),
      create: jest.fn(),
    },
    score: {
      findMany: jest.fn(),
      create: jest.fn(),
    },
  })),
}));
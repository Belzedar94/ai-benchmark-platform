import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// Get all benchmarks
router.get('/', async (req, res) => {
  try {
    const benchmarks = await prisma.benchmark.findMany({
      include: {
        category: true,
        scores: {
          include: {
            model: true
          }
        }
      }
    });
    res.json(benchmarks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch benchmarks' });
  }
});

// Get a single benchmark by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const benchmark = await prisma.benchmark.findUnique({
      where: { id: parseInt(id) },
      include: {
        category: true,
        scores: {
          include: {
            model: true
          }
        }
      }
    });
    
    if (!benchmark) {
      return res.status(404).json({ error: 'Benchmark not found' });
    }
    
    res.json(benchmark);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch benchmark' });
  }
});

// Create a new benchmark
router.post('/', async (req, res) => {
  try {
    const benchmark = await prisma.benchmark.create({
      data: req.body,
      include: {
        category: true
      }
    });
    res.status(201).json(benchmark);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create benchmark' });
  }
});

export default router;
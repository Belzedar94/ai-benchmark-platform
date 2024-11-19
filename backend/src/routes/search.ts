import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// Search benchmarks and models
router.get('/', async (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q || typeof q !== 'string') {
      return res.status(400).json({ error: 'Search query is required' });
    }

    const [benchmarks, models] = await Promise.all([
      prisma.benchmark.findMany({
        where: {
          OR: [
            { name: { contains: q } },
            { description: { contains: q } },
            { methodologyOverview: { contains: q } }
          ]
        },
        include: {
          category: true,
          scores: {
            include: {
              model: true
            }
          }
        }
      }),
      prisma.model.findMany({
        where: {
          name: { contains: q }
        },
        include: {
          type: true,
          scores: {
            include: {
              benchmark: true
            }
          }
        }
      })
    ]);

    res.json({
      benchmarks,
      models
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to perform search' });
  }
});

export default router;
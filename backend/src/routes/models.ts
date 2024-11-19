import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// Get all models
router.get('/', async (req, res) => {
  try {
    const models = await prisma.model.findMany({
      include: {
        type: true,
        scores: {
          include: {
            benchmark: true
          }
        }
      }
    });
    res.json(models);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch models' });
  }
});

// Get a single model by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const model = await prisma.model.findUnique({
      where: { id: parseInt(id) },
      include: {
        type: true,
        scores: {
          include: {
            benchmark: true
          }
        }
      }
    });
    
    if (!model) {
      return res.status(404).json({ error: 'Model not found' });
    }
    
    res.json(model);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch model' });
  }
});

// Create a new model
router.post('/', async (req, res) => {
  try {
    const model = await prisma.model.create({
      data: req.body,
      include: {
        type: true
      }
    });
    res.status(201).json(model);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create model' });
  }
});

export default router;
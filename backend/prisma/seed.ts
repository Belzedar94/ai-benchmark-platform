import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create categories
  const nlpCategory = await prisma.category.create({
    data: {
      name: 'Natural Language Processing'
    }
  });

  const cvCategory = await prisma.category.create({
    data: {
      name: 'Computer Vision'
    }
  });

  // Create model types
  const transformerType = await prisma.modelType.create({
    data: {
      name: 'Transformer'
    }
  });

  const cnnType = await prisma.modelType.create({
    data: {
      name: 'CNN'
    }
  });

  // Create models
  const gpt3 = await prisma.model.create({
    data: {
      name: 'GPT-3',
      typeId: transformerType.id
    }
  });

  const bert = await prisma.model.create({
    data: {
      name: 'BERT',
      typeId: transformerType.id
    }
  });

  const resnet = await prisma.model.create({
    data: {
      name: 'ResNet-50',
      typeId: cnnType.id
    }
  });

  // Create benchmarks
  const glue = await prisma.benchmark.create({
    data: {
      name: 'GLUE',
      description: 'General Language Understanding Evaluation benchmark',
      categoryId: nlpCategory.id,
      linkToPaper: 'https://arxiv.org/abs/1804.07461',
      methodologyOverview: 'Collection of diverse NLP tasks for evaluating language models',
      humanBaseline: 87.1
    }
  });

  const imagenet = await prisma.benchmark.create({
    data: {
      name: 'ImageNet',
      description: 'Large Scale Visual Recognition Challenge',
      categoryId: cvCategory.id,
      linkToPaper: 'https://arxiv.org/abs/1409.0575',
      methodologyOverview: 'Image classification benchmark with 1000 categories',
      humanBaseline: 95.2
    }
  });

  // Create scores
  await prisma.score.createMany({
    data: [
      {
        benchmarkId: glue.id,
        modelId: gpt3.id,
        score: 89.3
      },
      {
        benchmarkId: glue.id,
        modelId: bert.id,
        score: 84.6
      },
      {
        benchmarkId: imagenet.id,
        modelId: resnet.id,
        score: 76.1
      }
    ]
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const { Schema } = mongoose;

// Define schemas
const ModelSchema = new Schema(
  {
    name: { type: String, required: true },
    identifier: { type: String, required: true, unique: true },
    provider: { type: String, required: true },
    eloScore: { type: Number, default: 1000 },
    wins: { type: Number, default: 0 },
    losses: { type: Number, default: 0 },
    draws: { type: Number, default: 0 },
    totalAppearances: { type: Number, default: 0 },
    arenaType: { type: String, required: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const PromptSchema = new Schema(
  {
    text: { type: String, required: true },
    arenaType: { type: String, required: true },
    submittedBy: { type: String },
    status: { 
      type: String, 
      enum: ['pending', 'approved', 'rejected'], 
      default: 'pending' 
    },
    usageCount: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Create models
const Model = mongoose.model('Model', ModelSchema);
const Prompt = mongoose.model('Prompt', PromptSchema);

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

// Sample data
const models = [
  // Text generation models
  {
    name: 'GPT-4o',
    identifier: 'openai/gpt-4o',
    provider: 'OpenAI',
    arenaType: 'text',
    eloScore: 1000,
  },
  {
    name: 'Claude 3 Opus',
    identifier: 'anthropic/claude-3-opus',
    provider: 'Anthropic',
    arenaType: 'text',
    eloScore: 1000,
  },
  {
    name: 'Gemini 1.5 Pro',
    identifier: 'google/gemini-1.5-pro',
    provider: 'Google',
    arenaType: 'text',
    eloScore: 1000,
  },
  {
    name: 'Llama 3 70B',
    identifier: 'meta-llama/llama-3-70b-instruct',
    provider: 'Meta',
    arenaType: 'text',
    eloScore: 1000,
  },
  
  // SVG generation models
  {
    name: 'GPT-4o',
    identifier: 'openai/gpt-4o-svg',
    provider: 'OpenAI',
    arenaType: 'svg',
    eloScore: 1000,
  },
  {
    name: 'Claude 3 Opus',
    identifier: 'anthropic/claude-3-opus-svg',
    provider: 'Anthropic',
    arenaType: 'svg',
    eloScore: 1000,
  },
  {
    name: 'Gemini 1.5 Pro',
    identifier: 'google/gemini-1.5-pro-svg',
    provider: 'Google',
    arenaType: 'svg',
    eloScore: 1000,
  },
  
  // Twigl.app models
  {
    name: 'GPT-4o',
    identifier: 'openai/gpt-4o-twigl',
    provider: 'OpenAI',
    arenaType: 'twigl',
    eloScore: 1000,
  },
  {
    name: 'Claude 3 Opus',
    identifier: 'anthropic/claude-3-opus-twigl',
    provider: 'Anthropic',
    arenaType: 'twigl',
    eloScore: 1000,
  },
  
  // Music generation models
  {
    name: 'GPT-4o',
    identifier: 'openai/gpt-4o-music',
    provider: 'OpenAI',
    arenaType: 'music',
    eloScore: 1000,
  },
  {
    name: 'Claude 3 Opus',
    identifier: 'anthropic/claude-3-opus-music',
    provider: 'Anthropic',
    arenaType: 'music',
    eloScore: 1000,
  },
];

const prompts = [
  // Text generation prompts
  {
    text: 'Explain quantum computing to a 10-year-old child.',
    arenaType: 'text',
    status: 'approved',
  },
  {
    text: 'Write a short poem about the changing seasons.',
    arenaType: 'text',
    status: 'approved',
  },
  {
    text: 'Describe three innovative solutions to reduce plastic waste in oceans.',
    arenaType: 'text',
    status: 'approved',
  },
  
  // SVG generation prompts
  {
    text: 'Create an SVG of a simple landscape with mountains, a sun, and trees.',
    arenaType: 'svg',
    status: 'approved',
  },
  {
    text: 'Generate SVG code for a minimalist logo of a rocket launching.',
    arenaType: 'svg',
    status: 'approved',
  },
  
  // Twigl.app prompts
  {
    text: 'Create a Twigl.app shader that generates a colorful mandelbrot fractal.',
    arenaType: 'twigl',
    status: 'approved',
  },
  {
    text: 'Write a Twigl.app shader that creates a sunset over an ocean with waves.',
    arenaType: 'twigl',
    status: 'approved',
  },
  
  // Music generation prompts
  {
    text: 'Generate ABC notation for a simple folk melody in 4/4 time.',
    arenaType: 'music',
    status: 'approved',
  },
  {
    text: 'Create a short piano piece in the style of Debussy using MusicXML.',
    arenaType: 'music',
    status: 'approved',
  },
];

async function seedDatabase() {
  let mongoMemoryServer = null;
  
  try {
    // Always use MongoDB memory server for seeding
    console.log('Using in-memory MongoDB server for seeding');
    mongoMemoryServer = await MongoMemoryServer.create();
    const MONGODB_URI = mongoMemoryServer.getUri();
    console.log(`MongoDB Memory Server URI: ${MONGODB_URI}`);
    
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');
    
    // Clear existing data
    await Model.deleteMany({});
    await Prompt.deleteMany({});
    console.log('Cleared existing data');
    
    // Insert new data
    await Model.insertMany(models);
    console.log(`Inserted ${models.length} models`);
    
    await Prompt.insertMany(prompts);
    console.log(`Inserted ${prompts.length} prompts`);
    
    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
    
    if (mongoMemoryServer) {
      await mongoMemoryServer.stop();
      console.log('MongoDB Memory Server stopped');
    }
  }
}

seedDatabase();
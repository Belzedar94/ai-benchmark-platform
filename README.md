# AI Benchmark Platform

A comprehensive platform for tracking and comparing AI model performance across various benchmarks.

## Features

- Performance Matrix showing model scores across different benchmarks
- Detailed benchmark information pages
- Filtering by categories and model types
- Search functionality
- RESTful API for data access
- Responsive design for all devices

## Tech Stack

### Frontend
- Next.js 14
- TypeScript
- Tailwind CSS
- React Hooks for state management

### Backend
- Express.js
- TypeScript
- Prisma ORM
- SQLite (development) / PostgreSQL (production)

## Project Structure

```
ai-benchmark-platform/
├── frontend/               # Next.js frontend application
│   ├── src/
│   │   ├── app/           # Next.js app directory
│   │   ├── components/    # React components
│   │   └── styles/        # Global styles
│   ├── public/            # Static assets
│   └── package.json
│
├── backend/               # Express.js backend application
│   ├── src/
│   │   ├── routes/       # API routes
│   │   └── server.ts     # Server entry point
│   ├── prisma/           # Database schema and migrations
│   └── package.json
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Git

### Installation

1. Clone the repository:
\`\`\`bash
git clone https://github.com/Belzedar94/ai-benchmark-platform.git
cd ai-benchmark-platform
\`\`\`

2. Install backend dependencies:
\`\`\`bash
cd backend
npm install
\`\`\`

3. Set up the database:
\`\`\`bash
npx prisma migrate dev
npx prisma db seed
\`\`\`

4. Install frontend dependencies:
\`\`\`bash
cd ../frontend
npm install
\`\`\`

### Running the Application

1. Start the backend server:
\`\`\`bash
cd backend
npm run dev
\`\`\`

2. In a new terminal, start the frontend:
\`\`\`bash
cd frontend
npm run dev
\`\`\`

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001

## API Documentation

### Endpoints

- \`GET /api/benchmarks\`: List all benchmarks
- \`GET /api/benchmarks/:id\`: Get benchmark details
- \`GET /api/models\`: List all models
- \`GET /api/categories\`: List all categories
- \`GET /api/search\`: Search benchmarks and models

### Example Response

\`\`\`json
{
  "benchmarks": [
    {
      "id": 1,
      "name": "GLUE",
      "description": "General Language Understanding Evaluation benchmark",
      "category": {
        "id": 1,
        "name": "Natural Language Processing"
      },
      "scores": [
        {
          "score": 89.3,
          "model": {
            "name": "GPT-3"
          }
        }
      ]
    }
  ]
}
\`\`\`

## Development

### Code Style

- Use TypeScript for type safety
- Follow ESLint configuration
- Use Prettier for code formatting

### Branch Strategy

- \`master\`: Production-ready code
- \`develop\`: Development branch
- Feature branches: \`feature/feature-name\`

### Testing

Run tests:
\`\`\`bash
npm test
\`\`\`

## Deployment

### Frontend (Vercel)

1. Connect your Vercel account
2. Configure environment variables
3. Deploy using Vercel CLI or GitHub integration

### Backend

1. Set up PostgreSQL database
2. Configure environment variables
3. Deploy to your preferred hosting service

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Roadmap

### Phase 1 (Current)
- ✅ Core platform functionality
- ✅ Performance matrix
- ✅ Basic filtering and search
- 🔄 Testing implementation
- 🔄 Deployment setup

### Phase 2
- User authentication
- Enhanced visualizations
- Community features
- Performance optimizations
- Advanced analytics

## Contact

For questions or feedback, please open an issue in the GitHub repository.
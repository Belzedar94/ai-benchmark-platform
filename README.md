# AI Benchmark Platform

A comprehensive platform for tracking and comparing AI model performance across various benchmarks.

## Features

- Performance Matrix showing model scores across different benchmarks
- Detailed benchmark information pages
- Filtering by categories and model types
- Search functionality
- User authentication and authorization
- Real-time monitoring with Prometheus and Grafana
- User feedback system
- RESTful API with Swagger documentation
- Responsive design for all devices

## Tech Stack

### Frontend
- Next.js 14
- TypeScript
- Tailwind CSS
- NextAuth.js for authentication
- React Testing Library for component testing

### Backend
- Express.js
- TypeScript
- Prisma ORM
- Redis for caching
- JWT for authentication
- Jest for testing
- Swagger for API documentation

### Infrastructure
- Docker and Docker Compose
- Prometheus for metrics collection
- Grafana for monitoring dashboards
- GitHub Actions for CI/CD

## Project Structure

```
ai-benchmark-platform/
├── frontend/                 # Next.js frontend application
│   ├── src/
│   │   ├── app/             # Next.js app directory
│   │   ├── components/      # React components
│   │   └── __tests__/      # Frontend tests
│   ├── public/              # Static assets
│   └── package.json
│
├── backend/                 # Express.js backend application
│   ├── src/
│   │   ├── routes/         # API routes
│   │   ├── services/       # Business logic
│   │   ├── middleware/     # Express middleware
│   │   └── __tests__/     # Backend tests
│   ├── prisma/             # Database schema and migrations
│   └── package.json
│
├── monitoring/             # Monitoring configuration
│   ├── grafana/           # Grafana dashboards
│   └── prometheus/        # Prometheus configuration
│
└── docker-compose.yml     # Docker Compose configuration
```

## Getting Started

### Prerequisites

- Node.js 18+
- Docker and Docker Compose
- npm or yarn
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Belzedar94/ai-benchmark-platform.git
cd ai-benchmark-platform
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Set up the database:
```bash
npx prisma migrate dev
npx prisma db seed
```

4. Install frontend dependencies:
```bash
cd ../frontend
npm install
```

### Running the Application

1. Using Docker Compose (recommended):
```bash
docker-compose up
```

This will start:
- Frontend at http://localhost:3000
- Backend API at http://localhost:3001
- Prometheus at http://localhost:9090
- Grafana at http://localhost:3000

2. Running locally:

Backend:
```bash
cd backend
npm run dev
```

Frontend:
```bash
cd frontend
npm run dev
```

### Running Tests

Backend tests:
```bash
cd backend
npm test                 # Run tests
npm run test:watch      # Run tests in watch mode
npm run test:coverage   # Run tests with coverage
```

Frontend tests:
```bash
cd frontend
npm test
npm run test:watch
npm run test:coverage
```

## Testing Strategy

### Backend Tests

1. Unit Tests
- Services: Authentication, Caching, Monitoring
- Middleware: Auth, Monitoring
- Utility functions

2. Integration Tests
- API endpoints
- Database operations
- Redis caching
- Metrics collection

3. Test Coverage Requirements
- Minimum 70% coverage for:
  - Branches
  - Functions
  - Lines
  - Statements

### Frontend Tests

1. Component Tests
- Rendering tests
- User interaction tests
- State management tests

2. Integration Tests
- Page navigation
- Data fetching
- Authentication flow

3. End-to-End Tests
- User journeys
- Form submissions
- Error handling

## API Documentation

API documentation is available at http://localhost:3001/api-docs when running the application.

### Key Endpoints

- `POST /api/auth/register`: Register a new user
- `POST /api/auth/login`: Login user
- `GET /api/benchmarks`: List all benchmarks
- `GET /api/benchmarks/:id`: Get benchmark details
- `GET /api/models`: List all models
- `GET /api/categories`: List all categories
- `GET /api/search`: Search benchmarks and models

## Monitoring

### Metrics Available

- HTTP request duration and count
- Cache hit/miss rates
- Authentication success/failure rates
- API endpoint usage
- System resources (CPU, Memory, etc.)

### Accessing Monitoring

1. Grafana Dashboards: http://localhost:3000
   - Default credentials: admin/admin
   - Pre-configured dashboards for all metrics

2. Prometheus: http://localhost:9090
   - Raw metrics and query interface

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

### Development Guidelines

- Write tests for new features
- Update documentation for API changes
- Follow the existing code style
- Use meaningful commit messages

### Code Style

- Use TypeScript for type safety
- Follow ESLint configuration
- Use Prettier for code formatting
- Add JSDoc comments for functions

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For questions or feedback:
1. Open an issue in the GitHub repository
2. Use the feedback widget in the application
3. Contact the maintainers directly

## Roadmap

### Phase 1 (Completed)
- ✅ Core platform functionality
- ✅ Performance matrix
- ✅ Basic filtering and search
- ✅ Testing implementation
- ✅ Deployment setup

### Phase 2 (In Progress)
- ✅ User authentication
- ✅ Enhanced monitoring
- ✅ Community features
- ✅ Performance optimizations
- ✅ Advanced analytics

### Phase 3 (Upcoming)
- [ ] Trend graphs for performance visualization
- [ ] Benchmark suggestion system
- [ ] Issue reporting system
- [ ] Machine learning model integration
- [ ] Advanced analytics dashboard
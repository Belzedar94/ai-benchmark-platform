# LLM Arena

LLM Arena is a web application for evaluating large language models in unconventional tasks through an A/B testing format. Users can compare anonymized responses from different LLMs, vote for the better answer, and contribute to a global Elo-based leaderboard.

## Features

- **A/B Comparison Interface**: Compare two anonymized LLM responses to the same prompt
- **Multiple Arena Types**: Test LLMs in different domains (text, SVG, Twigl.app code, music)
- **Elo Rating System**: Track model performance using a chess-like rating system
- **Global Leaderboards**: View ranked models by their Elo scores
- **Prompt Submission**: Allow users to submit new prompts (with moderation)

## Tech Stack

- **Frontend**: Next.js (React)
- **Backend**: Next.js API routes
- **Database**: MongoDB
- **Styling**: Tailwind CSS
- **API Integration**: OpenRouter API for LLM responses

## Getting Started

### Prerequisites

- Node.js (v16+ or v18+)
- MongoDB (local or MongoDB Atlas)
- OpenRouter API key

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/llm-arena.git
   cd llm-arena
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory with the following variables:
   ```
   MONGODB_URI=your_mongodb_connection_string
   OPENROUTER_API_KEY=your_openrouter_api_key
   NEXT_PUBLIC_SERVER_URL=http://localhost:12000
   ```

4. Seed the database with initial data:
   ```bash
   npm run seed
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:12000](http://localhost:12000) in your browser.

## Project Structure

- `/app`: Next.js app directory with pages and API routes
- `/components`: Reusable React components
- `/utils`: Helper functions and database models
- `/scripts`: Utility scripts (e.g., database seeding)
- `/styles`: Global CSS and Tailwind configuration

## API Routes

- `/api/fetch-llm`: Fetch responses from two LLMs for a given prompt
- `/api/vote`: Submit a vote and update Elo ratings
- `/api/prompts`: Submit or retrieve prompts
- `/api/leaderboard`: Get the ranked list of models

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Inspired by [ArtificialAnalysis.ai](https://artificialanalysis.ai)
- Uses the OpenRouter API to access various LLMs
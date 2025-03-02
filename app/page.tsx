import Link from 'next/link';
import ArenaSelector from '@/components/ArenaSelector';

export default function Home() {
  return (
    <div>
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-4">Welcome to LLM Arena</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Compare and evaluate LLMs in unconventional tasks through A/B testing.
          Your votes help build a global leaderboard of model performance.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <Link href="/arena/text" className="block">
          <div className="bg-white rounded-lg shadow-md p-6 h-full hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold mb-2">Text Generation Arena</h2>
            <p className="text-gray-600 mb-4">
              Compare how different LLMs respond to text prompts. Vote for the better response.
            </p>
            <div className="text-primary font-medium">Enter Arena →</div>
          </div>
        </Link>

        <Link href="/arena/svg" className="block">
          <div className="bg-white rounded-lg shadow-md p-6 h-full hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold mb-2">SVG Generation Arena</h2>
            <p className="text-gray-600 mb-4">
              See how models perform at generating SVG code from descriptions.
            </p>
            <div className="text-primary font-medium">Enter Arena →</div>
          </div>
        </Link>

        <Link href="/arena/twigl" className="block">
          <div className="bg-white rounded-lg shadow-md p-6 h-full hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold mb-2">Twigl.app Code Arena</h2>
            <p className="text-gray-600 mb-4">
              Compare LLMs' ability to generate creative shader code for Twigl.app.
            </p>
            <div className="text-primary font-medium">Enter Arena →</div>
          </div>
        </Link>

        <Link href="/arena/music" className="block">
          <div className="bg-white rounded-lg shadow-md p-6 h-full hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold mb-2">Music Generation Arena</h2>
            <p className="text-gray-600 mb-4">
              Evaluate LLMs on their ability to generate music notation or code.
            </p>
            <div className="text-primary font-medium">Enter Arena →</div>
          </div>
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className="text-2xl font-bold text-primary mb-2">1</div>
            <h3 className="text-lg font-medium mb-2">Select an Arena</h3>
            <p className="text-gray-600">
              Choose from different arenas testing various LLM capabilities.
            </p>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary mb-2">2</div>
            <h3 className="text-lg font-medium mb-2">Compare Responses</h3>
            <p className="text-gray-600">
              View two anonymized LLM responses to the same prompt.
            </p>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary mb-2">3</div>
            <h3 className="text-lg font-medium mb-2">Vote & Contribute</h3>
            <p className="text-gray-600">
              Vote for the better response and help build the global leaderboard.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
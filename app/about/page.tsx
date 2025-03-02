const AboutPage = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">About LLM Arena</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Our Mission</h2>
        <p className="text-gray-600 mb-4">
          LLM Arena aims to evaluate large language models in unconventional tasks through 
          a transparent, community-driven approach. By collecting human preferences via A/B testing, 
          we build comprehensive leaderboards that help researchers, developers, and users 
          understand the strengths and limitations of different models.
        </p>
        <p className="text-gray-600">
          Unlike traditional benchmarks that focus on standard NLP tasks, we explore how LLMs 
          perform in creative and specialized domains like SVG generation, shader code, and music notation.
        </p>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">How It Works</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium mb-2">1. A/B Testing</h3>
            <p className="text-gray-600">
              Users are presented with a prompt and two anonymized responses from different LLMs.
              They vote for the response they prefer, or indicate a tie if both are equally good.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-2">2. Elo Rating System</h3>
            <p className="text-gray-600">
              We use the Elo rating system (similar to chess rankings) to calculate model performance.
              When a model wins a comparison, it gains points based on the opponent's rating.
              The amount of points gained or lost depends on the expected outcome based on current ratings.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-2">3. Specialized Arenas</h3>
            <p className="text-gray-600">
              Different arenas focus on specific capabilities:
            </p>
            <ul className="list-disc pl-5 mt-2 text-gray-600">
              <li><strong>Text Generation:</strong> General text responses to prompts</li>
              <li><strong>SVG Generation:</strong> Creating SVG code from descriptions</li>
              <li><strong>Twigl.app Code:</strong> Generating shader code for visual effects</li>
              <li><strong>Music Generation:</strong> Creating music notation or code</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Methodology</h2>
        <p className="text-gray-600 mb-4">
          Our methodology prioritizes fairness and transparency:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-gray-600">
          <li>
            <strong>Anonymous Comparisons:</strong> Models are never identified during voting to prevent bias.
          </li>
          <li>
            <strong>Randomized Ordering:</strong> The order of responses (A/B) is randomized for each comparison.
          </li>
          <li>
            <strong>Prompt Moderation:</strong> All user-submitted prompts are reviewed before inclusion.
          </li>
          <li>
            <strong>Open Data:</strong> We plan to publish anonymized voting data for research purposes.
          </li>
        </ul>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Support the Project</h2>
        <p className="text-gray-600 mb-4">
          LLM Arena is a non-profit, community-driven project. You can support us by:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-gray-600">
          <li>Contributing high-quality prompts</li>
          <li>Participating in voting sessions</li>
          <li>Sharing the project with others</li>
          <li>Making a donation to help cover API and hosting costs</li>
        </ul>
        <div className="mt-6">
          <a
            href="https://www.buymeacoffee.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-secondary hover:bg-opacity-90"
          >
            Support LLM Arena
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
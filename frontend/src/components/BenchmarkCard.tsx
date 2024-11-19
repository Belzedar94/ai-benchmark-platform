import React from 'react';
import Link from 'next/link';

interface Score {
  id: number;
  score: number;
  lastUpdated: string;
  model: {
    id: number;
    name: string;
  };
}

interface Benchmark {
  id: number;
  name: string;
  description: string;
  category: {
    id: number;
    name: string;
  };
  linkToPaper: string | null;
  methodologyOverview: string;
  humanBaseline: number | null;
  scores: Score[];
}

interface BenchmarkCardProps {
  benchmark: Benchmark;
}

const BenchmarkCard: React.FC<BenchmarkCardProps> = ({ benchmark }) => {
  const topScore = benchmark.scores.reduce(
    (max, score) => (score.score > max.score ? score : max),
    benchmark.scores[0]
  );

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            <Link href={`/benchmarks/${benchmark.id}`} className="hover:text-indigo-600">
              {benchmark.name}
            </Link>
          </h2>
          <p className="text-sm text-gray-500">{benchmark.category.name}</p>
        </div>
        {benchmark.humanBaseline && (
          <div className="text-right">
            <span className="text-sm text-gray-500">Human Baseline</span>
            <p className="text-lg font-semibold text-gray-900">
              {benchmark.humanBaseline.toFixed(1)}
            </p>
          </div>
        )}
      </div>

      <p className="mt-4 text-gray-600">{benchmark.description}</p>

      <div className="mt-4">
        <h3 className="text-sm font-medium text-gray-900">Current Leader</h3>
        {topScore ? (
          <div className="mt-1 flex justify-between items-center">
            <span className="text-sm text-gray-600">{topScore.model.name}</span>
            <span className="text-sm font-semibold text-gray-900">
              {topScore.score.toFixed(1)}
            </span>
          </div>
        ) : (
          <p className="text-sm text-gray-500">No scores available</p>
        )}
      </div>

      {benchmark.linkToPaper && (
        <div className="mt-4">
          <a
            href={benchmark.linkToPaper}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-indigo-600 hover:text-indigo-500"
          >
            View Paper →
          </a>
        </div>
      )}
    </div>
  );
};

export default BenchmarkCard;
import React, { useEffect, useState } from 'react';

interface Score {
  id: number;
  score: number;
  lastUpdated: string;
  benchmark: Benchmark;
  model: Model;
}

interface Benchmark {
  id: number;
  name: string;
  description: string;
  category: Category;
  scores: Score[];
}

interface Model {
  id: number;
  name: string;
  type: ModelType;
  scores: Score[];
}

interface Category {
  id: number;
  name: string;
}

interface ModelType {
  id: number;
  name: string;
}

const PerformanceMatrix = () => {
  const [benchmarks, setBenchmarks] = useState<Benchmark[]>([]);
  const [models, setModels] = useState<Model[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [benchmarksRes, modelsRes] = await Promise.all([
          fetch('http://localhost:3001/api/benchmarks'),
          fetch('http://localhost:3001/api/models')
        ]);

        if (!benchmarksRes.ok || !modelsRes.ok) {
          throw new Error('Failed to fetch data');
        }

        const benchmarksData = await benchmarksRes.json();
        const modelsData = await modelsRes.json();

        setBenchmarks(benchmarksData);
        setModels(modelsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Benchmark
            </th>
            {models.map((model) => (
              <th
                key={model.id}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {model.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {benchmarks.map((benchmark) => (
            <tr key={benchmark.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {benchmark.name}
              </td>
              {models.map((model) => {
                const score = benchmark.scores.find(
                  (s) => s.model.id === model.id
                );
                return (
                  <td
                    key={model.id}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                  >
                    {score ? (
                      <div>
                        <div>{score.score.toFixed(1)}</div>
                        <div className="text-xs text-gray-400">
                          {new Date(score.lastUpdated).toLocaleDateString()}
                        </div>
                      </div>
                    ) : (
                      '-'
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PerformanceMatrix;
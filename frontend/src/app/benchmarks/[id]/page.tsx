'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

interface Score {
  id: number;
  score: number;
  lastUpdated: string;
  model: {
    id: number;
    name: string;
    type: {
      id: number;
      name: string;
    };
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

export default function BenchmarkPage({ params }: { params: { id: string } }) {
  const [benchmark, setBenchmark] = useState<Benchmark | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBenchmark = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/benchmarks/${params.id}`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch benchmark');
        }
        const data = await response.json();
        setBenchmark(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchBenchmark();
  }, [params.id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || !benchmark) {
    return <div>Error: {error || 'Benchmark not found'}</div>;
  }

  const sortedScores = [...benchmark.scores].sort((a, b) => b.score - a.score);

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <nav className="mb-8">
            <Link
              href="/"
              className="text-indigo-600 hover:text-indigo-500"
            >
              ← Back to Performance Matrix
            </Link>
          </nav>

          <div className="bg-white shadow rounded-lg p-6">
            <div className="border-b border-gray-200 pb-6 mb-6">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    {benchmark.name}
                  </h1>
                  <p className="mt-2 text-sm text-gray-500">
                    {benchmark.category.name}
                  </p>
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
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Methodology Overview
              </h2>
              <p className="text-gray-600">{benchmark.methodologyOverview}</p>
            </div>

            {benchmark.linkToPaper && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Research Paper
                </h2>
                <a
                  href={benchmark.linkToPaper}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:text-indigo-500"
                >
                  View Original Paper →
                </a>
              </div>
            )}

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Model Performance
              </h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Model
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Score
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Last Updated
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {sortedScores.map((score) => (
                      <tr key={score.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {score.model.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {score.model.type.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {score.score.toFixed(1)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(score.lastUpdated).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
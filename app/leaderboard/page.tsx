'use client';

import { useState, useEffect } from 'react';
import ArenaSelector from '@/components/ArenaSelector';
import LeaderboardTable from '@/components/LeaderboardTable';

interface Model {
  _id: string;
  name: string;
  provider: string;
  eloScore: number;
  wins: number;
  losses: number;
  draws: number;
  totalAppearances: number;
}

const LeaderboardPage = () => {
  const [arenaType, setArenaType] = useState('text');
  const [models, setModels] = useState<Model[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Get arena type from URL if available
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const arenaTypeParam = urlParams.get('arenaType');
    if (arenaTypeParam) {
      setArenaType(arenaTypeParam);
    }
  }, []);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch(`/api/leaderboard?arenaType=${arenaType}`);
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch leaderboard');
        }
        
        setModels(data.models || []);
      } catch (err: any) {
        setError(err.message || 'An error occurred');
        console.error('Error fetching leaderboard:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchLeaderboard();
    
    // Update URL with arena type
    const url = new URL(window.location.href);
    url.searchParams.set('arenaType', arenaType);
    window.history.pushState({}, '', url.toString());
  }, [arenaType]);

  const handleArenaChange = (type: string) => {
    setArenaType(type);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Global Leaderboard</h1>
      
      <div className="mb-6">
        <ArenaSelector currentArena={arenaType} />
      </div>
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 rounded-md p-4 mb-6">
          {error}
        </div>
      )}
      
      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
          <p className="mt-4 text-gray-600">Loading leaderboard...</p>
        </div>
      ) : (
        <>
          {models.length === 0 ? (
            <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-md p-4">
              No models found for this arena type. Check back later as more votes are collected.
            </div>
          ) : (
            <LeaderboardTable models={models} arenaType={arenaType} />
          )}
          
          <div className="mt-8 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">About the Leaderboard</h2>
            <p className="text-gray-600 mb-4">
              This leaderboard ranks LLMs based on user votes in the {arenaType} arena. 
              Models are ranked using the Elo rating system, which is commonly used in chess and other competitive games.
            </p>
            <p className="text-gray-600">
              Each model starts with a base rating of 1000. When users vote in the arena, 
              the winning model gains points while the losing model loses points. 
              The amount of points gained or lost depends on the relative ratings of the two models.
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default LeaderboardPage;
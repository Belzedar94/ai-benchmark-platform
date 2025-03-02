'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import ArenaSelector from '@/components/ArenaSelector';
import PromptDisplay from '@/components/PromptDisplay';
import ResponseCard from '@/components/ResponseCard';

interface Prompt {
  _id: string;
  text: string;
}

interface ModelResponse {
  id: string;
  name: string;
  response: string;
}

const ArenaPage = () => {
  const params = useParams();
  const router = useRouter();
  const arenaType = params.type as string;
  
  const [loading, setLoading] = useState(true);
  const [voting, setVoting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<Prompt | null>(null);
  const [modelA, setModelA] = useState<ModelResponse | null>(null);
  const [modelB, setModelB] = useState<ModelResponse | null>(null);
  const [sessionId, setSessionId] = useState<string>('');
  
  // Generate a session ID if not exists
  useEffect(() => {
    if (!sessionId) {
      setSessionId(`session_${Math.random().toString(36).substring(2, 15)}`);
    }
  }, [sessionId]);
  
  // Fetch a random prompt and model responses
  const fetchComparisonData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      console.log('Fetching comparison data for arena type:', arenaType);
      
      // Use the simple mock API instead
      const responseData = await fetch(`/api/mock?arenaType=${arenaType}`);
      const modelResponses = await responseData.json();
      console.log('Model responses:', modelResponses);
      
      if (!responseData.ok) {
        throw new Error(modelResponses.error || 'Failed to fetch model responses');
      }
      
      // Use a random ID if the prompt doesn't have one
      const promptId = Math.random().toString(36).substring(2, 15);
      
      setPrompt({ 
        _id: promptId, 
        text: modelResponses.prompt 
      });
      
      setModelA(modelResponses.modelA);
      setModelB(modelResponses.modelB);
    } catch (err: any) {
      setError(err.message || 'An error occurred');
      console.error('Error fetching comparison data:', err);
    } finally {
      setLoading(false);
    }
  };
  
  // Load initial data
  useEffect(() => {
    fetchComparisonData();
  }, [arenaType]);
  
  // Handle voting
  const handleVote = async (winner: string) => {
    if (!prompt || !modelA || !modelB || voting) return;
    
    setVoting(true);
    
    try {
      console.log('Submitting vote:', {
        promptId: prompt._id,
        modelAId: modelA.id,
        modelBId: modelB.id,
        winner: winner === 'tie' ? 'tie' : (winner === 'A' ? modelA.id : modelB.id),
      });
      
      const response = await fetch('/api/vote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          promptId: prompt._id,
          modelAId: modelA.id,
          modelBId: modelB.id,
          responseA: modelA.response,
          responseB: modelB.response,
          winner: winner === 'tie' ? 'tie' : (winner === 'A' ? modelA.id : modelB.id),
          arenaType,
          sessionId,
        }),
      });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to submit vote');
      }
      
      // Load new comparison after successful vote
      fetchComparisonData();
    } catch (err: any) {
      setError(err.message || 'Failed to submit your vote');
      console.error('Error submitting vote:', err);
    } finally {
      setVoting(false);
    }
  };
  
  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (loading || voting) return;
      
      if (e.key === 'a' || e.key === 'A') {
        handleVote('A');
      } else if (e.key === 'b' || e.key === 'B') {
        handleVote('B');
      } else if (e.key === 't' || e.key === 'T') {
        handleVote('tie');
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [loading, voting, prompt, modelA, modelB]);
  
  return (
    <div>
      <ArenaSelector currentArena={arenaType} />
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 rounded-md p-4 mb-6">
          {error}
        </div>
      )}
      
      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
          <p className="mt-4 text-gray-600">Loading comparison...</p>
        </div>
      ) : (
        <>
          {prompt && (
            <PromptDisplay prompt={prompt.text} arenaType={arenaType} />
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {modelA && (
              <ResponseCard
                label="A"
                response={modelA.response}
                onVote={() => handleVote('A')}
              />
            )}
            
            {modelB && (
              <ResponseCard
                label="B"
                response={modelB.response}
                onVote={() => handleVote('B')}
              />
            )}
          </div>
          
          <div className="text-center mb-8">
            <button
              onClick={() => handleVote('tie')}
              className="btn btn-outline"
              disabled={voting}
            >
              It's a tie (T)
            </button>
          </div>
          
          <div className="bg-gray-50 rounded-md p-4 text-sm text-gray-600">
            <p>
              <strong>Keyboard shortcuts:</strong> Press A or B to vote for the corresponding response, or T for a tie.
            </p>
          </div>
        </>
      )}
      
      {/* Debug information */}
      <div className="mt-8 p-4 bg-gray-100 rounded-md">
        <h3 className="text-lg font-semibold mb-2">Debug Info</h3>
        <p>Arena Type: {arenaType}</p>
        <p>Loading: {loading ? 'true' : 'false'}</p>
        <p>Voting: {voting ? 'true' : 'false'}</p>
        <p>Error: {error || 'none'}</p>
        <p>Prompt: {prompt ? JSON.stringify(prompt) : 'none'}</p>
        <p>Model A: {modelA ? JSON.stringify(modelA) : 'none'}</p>
        <p>Model B: {modelB ? JSON.stringify(modelB) : 'none'}</p>
      </div>
    </div>
  );
};

export default ArenaPage;
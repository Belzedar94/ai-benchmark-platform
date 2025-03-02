'use client';

import { useState } from 'react';

interface ResponseCardProps {
  label: string;
  response: string;
  onVote: () => void;
}

const ResponseCard = ({ label, response, onVote }: ResponseCardProps) => {
  const [showCode, setShowCode] = useState(true);
  
  // Check if the response is SVG code
  const isSvg = response.trim().startsWith('<svg');
  
  // Check if the response is shader code
  const isShader = response.includes('void mainImage') || response.includes('precision highp float');
  
  // Check if the response is music notation
  const isMusic = response.includes('X:1') && (response.includes('M:4/4') || response.includes('K:'));
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col h-full">
      <div className="mb-4 flex justify-between items-center">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          Response {label}
        </span>
        
        {(isSvg || isShader || isMusic) && (
          <button 
            onClick={() => setShowCode(!showCode)}
            className="text-xs text-gray-500 hover:text-gray-700"
          >
            {showCode ? 'Show Result' : 'Show Code'}
          </button>
        )}
      </div>
      
      <div className="flex-grow mb-4">
        {isSvg && !showCode ? (
          <div 
            className="bg-gray-50 p-4 rounded-md overflow-auto max-h-96"
            dangerouslySetInnerHTML={{ __html: response }}
          />
        ) : isShader && !showCode ? (
          <div className="bg-gray-50 p-4 rounded-md overflow-auto max-h-96 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <p>Shader preview not available</p>
              <p className="text-xs mt-2">Visit Twigl.app to see the result</p>
            </div>
          </div>
        ) : isMusic && !showCode ? (
          <div className="bg-gray-50 p-4 rounded-md overflow-auto max-h-96 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <p>Music notation preview not available</p>
              <p className="text-xs mt-2">Use an ABC notation player to hear the result</p>
            </div>
          </div>
        ) : (
          <pre className="whitespace-pre-wrap text-sm bg-gray-50 p-4 rounded-md overflow-auto max-h-96">
            {response}
          </pre>
        )}
      </div>
      
      <button
        onClick={onVote}
        className="w-full py-3 px-4 bg-primary text-white rounded-md hover:bg-opacity-90 transition-colors font-medium"
      >
        Prefer ({label} Key)
      </button>
    </div>
  );
};

export default ResponseCard;
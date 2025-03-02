'use client';

interface PromptDisplayProps {
  prompt: string;
  arenaType: string;
}

const PromptDisplay = ({ prompt, arenaType }: PromptDisplayProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-lg font-medium mb-2">Which response best answers this prompt?</h2>
      <div className="bg-gray-50 p-4 rounded-md">
        <p className="text-gray-800">{prompt}</p>
      </div>
    </div>
  );
};

export default PromptDisplay;
'use client';

import PromptSubmissionForm from '@/components/PromptSubmissionForm';

const arenaTypes = [
  { id: 'text', name: 'Text Generation' },
  { id: 'svg', name: 'SVG Generation' },
  { id: 'twigl', name: 'Twigl.app Code' },
  { id: 'music', name: 'Music Generation' },
];

const SubmitPromptPage = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Submit a Prompt</h1>
      
      <div className="max-w-2xl mx-auto">
        <PromptSubmissionForm arenaTypes={arenaTypes} />
        
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Prompt Guidelines</h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-600">
            <li>
              <strong>Be specific:</strong> Clear, well-defined prompts yield better comparisons.
            </li>
            <li>
              <strong>Avoid bias:</strong> Don't phrase prompts in a way that favors a particular type of response.
            </li>
            <li>
              <strong>Keep it appropriate:</strong> Prompts should not request harmful, illegal, or offensive content.
            </li>
            <li>
              <strong>Match the arena:</strong> Ensure your prompt is suitable for the selected arena type.
            </li>
            <li>
              <strong>Be original:</strong> Try to submit prompts that test unique aspects of model capabilities.
            </li>
          </ul>
          
          <div className="mt-6 p-4 bg-blue-50 rounded-md text-blue-800">
            <p className="text-sm">
              <strong>Note:</strong> All submitted prompts are reviewed before being added to the arena. 
              This process may take some time. Thank you for your contribution!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmitPromptPage;
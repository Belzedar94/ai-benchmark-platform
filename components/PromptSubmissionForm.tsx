'use client';

import { useState } from 'react';

interface PromptSubmissionFormProps {
  arenaTypes: { id: string; name: string }[];
}

const PromptSubmissionForm = ({ arenaTypes }: PromptSubmissionFormProps) => {
  const [prompt, setPrompt] = useState('');
  const [arenaType, setArenaType] = useState(arenaTypes[0]?.id || '');
  const [submitterName, setSubmitterName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!prompt.trim() || !arenaType) {
      setMessage({ 
        text: 'Please provide both a prompt and select an arena type', 
        type: 'error' 
      });
      return;
    }
    
    setIsSubmitting(true);
    setMessage({ text: '', type: '' });
    
    try {
      const response = await fetch('/api/prompts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: prompt,
          arenaType,
          submittedBy: submitterName || undefined,
        }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setMessage({ 
          text: 'Thank you! Your prompt has been submitted for moderation.', 
          type: 'success' 
        });
        setPrompt('');
        setSubmitterName('');
      } else {
        setMessage({ 
          text: data.error || 'Failed to submit prompt. Please try again.', 
          type: 'error' 
        });
      }
    } catch (error) {
      setMessage({ 
        text: 'An error occurred. Please try again later.', 
        type: 'error' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Submit a New Prompt</h2>
      
      {message.text && (
        <div 
          className={`p-4 mb-4 rounded-md ${
            message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
          }`}
        >
          {message.text}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 mb-1">
            Prompt *
          </label>
          <textarea
            id="prompt"
            rows={4}
            className="input"
            placeholder="Enter your prompt here..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            required
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="arenaType" className="block text-sm font-medium text-gray-700 mb-1">
            Arena Type *
          </label>
          <select
            id="arenaType"
            className="input"
            value={arenaType}
            onChange={(e) => setArenaType(e.target.value)}
            required
          >
            {arenaTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>
        </div>
        
        <div className="mb-6">
          <label htmlFor="submitterName" className="block text-sm font-medium text-gray-700 mb-1">
            Your Name (Optional)
          </label>
          <input
            type="text"
            id="submitterName"
            className="input"
            placeholder="Anonymous"
            value={submitterName}
            onChange={(e) => setSubmitterName(e.target.value)}
          />
        </div>
        
        <button
          type="submit"
          className="w-full btn btn-primary py-3"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Prompt'}
        </button>
        
        <p className="mt-3 text-sm text-gray-500">
          * All submissions will be reviewed before being added to the prompt pool.
        </p>
      </form>
    </div>
  );
};

export default PromptSubmissionForm;
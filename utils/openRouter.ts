import axios from 'axios';

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const OPENROUTER_BASE_URL = 'https://openrouter.ai/api/v1';

if (!OPENROUTER_API_KEY) {
  console.warn('OpenRouter API key is not defined in environment variables');
}

interface OpenRouterResponse {
  choices: {
    message: {
      content: string;
    };
  }[];
}

/**
 * Generate a response from a model using OpenRouter API
 * @param modelId - The model identifier to use
 * @param prompt - The prompt to send to the model
 * @returns The generated text response
 */
export async function generateResponse(modelId: string, prompt: string): Promise<string> {
  try {
    const response = await axios.post<OpenRouterResponse>(
      `${OPENROUTER_BASE_URL}/chat/completions`,
      {
        model: modelId,
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
          'HTTP-Referer': process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
          'X-Title': 'LLM Arena',
        },
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error generating response from OpenRouter:', error);
    throw new Error('Failed to generate response from the model');
  }
}

/**
 * Get available models from OpenRouter
 * @returns List of available models
 */
export async function getAvailableModels() {
  try {
    const response = await axios.get(`${OPENROUTER_BASE_URL}/models`, {
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
      },
    });

    return response.data.data;
  } catch (error) {
    console.error('Error fetching available models from OpenRouter:', error);
    throw new Error('Failed to fetch available models');
  }
}
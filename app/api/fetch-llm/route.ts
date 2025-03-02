import { NextRequest, NextResponse } from 'next/server';
import { getRandomPrompt, getRandomModels, getLLMResponse } from '@/utils/mockData';

export async function POST(req: NextRequest) {
  try {
    const { promptId, arenaType } = await req.json();
    
    if (!arenaType) {
      return NextResponse.json(
        { error: 'Arena type is required' },
        { status: 400 }
      );
    }
    
    // Get a random prompt if promptId is not provided
    let prompt;
    if (promptId) {
      // In a real implementation, we would fetch the specific prompt
      // For now, just get a random one
      prompt = await getRandomPrompt(arenaType);
    } else {
      prompt = await getRandomPrompt(arenaType);
    }
    
    if (!prompt) {
      return NextResponse.json(
        { error: 'No prompts available for this arena type' },
        { status: 404 }
      );
    }
    
    // Get two random models for this arena type
    const models = await getRandomModels(arenaType, 2);
    
    if (models.length < 2) {
      return NextResponse.json(
        { error: 'Not enough active models for this arena type' },
        { status: 400 }
      );
    }
    
    const [modelA, modelB] = models;
    
    // Generate responses in parallel
    const [responseA, responseB] = await Promise.all([
      getLLMResponse(modelA.name, prompt.text, arenaType),
      getLLMResponse(modelB.name, prompt.text, arenaType)
    ]);
    
    return NextResponse.json({
      prompt: prompt.text,
      modelA: {
        id: modelA._id,
        name: modelA.name,
        response: responseA
      },
      modelB: {
        id: modelB._id,
        name: modelB.name,
        response: responseB
      }
    });
  } catch (error) {
    console.error('Error in fetch-llm API:', error);
    return NextResponse.json(
      { error: 'Failed to fetch LLM responses' },
      { status: 500 }
    );
  }
}
import { NextRequest, NextResponse } from 'next/server';
import { getPrompts, submitPrompt } from '@/utils/mockData';

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const arenaType = url.searchParams.get('arenaType');
    const status = url.searchParams.get('status') || 'approved';
    
    if (!arenaType) {
      return NextResponse.json(
        { error: 'Arena type is required' },
        { status: 400 }
      );
    }
    
    // Get prompts from mock data
    const prompts = await getPrompts(arenaType, status);
    
    return NextResponse.json({ prompts });
  } catch (error) {
    console.error('Error in GET prompts API:', error);
    return NextResponse.json(
      { error: 'Failed to fetch prompts' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { text, arenaType, submittedBy } = await req.json();
    
    if (!text || !arenaType) {
      return NextResponse.json(
        { error: 'Prompt text and arena type are required' },
        { status: 400 }
      );
    }
    
    // Submit prompt using mock data
    const result = await submitPrompt(text, arenaType, submittedBy);
    
    return NextResponse.json({
      success: true,
      prompt: {
        id: result.promptId,
        text,
        arenaType,
        status: 'pending'
      }
    });
  } catch (error) {
    console.error('Error in POST prompts API:', error);
    return NextResponse.json(
      { error: 'Failed to submit prompt' },
      { status: 500 }
    );
  }
}
import { NextRequest, NextResponse } from 'next/server';
import { getModels } from '@/utils/mockData';

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const arenaType = url.searchParams.get('arenaType');
    
    if (!arenaType) {
      return NextResponse.json(
        { error: 'Arena type is required' },
        { status: 400 }
      );
    }
    
    // Get models for this arena type from mock data
    const models = await getModels(arenaType);
    
    return NextResponse.json({ models });
  } catch (error) {
    console.error('Error in leaderboard API:', error);
    return NextResponse.json(
      { error: 'Failed to fetch leaderboard' },
      { status: 500 }
    );
  }
}
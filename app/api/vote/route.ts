import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { 
      promptId, 
      modelAId, 
      modelBId, 
      responseA, 
      responseB, 
      winner, 
      arenaType,
      sessionId 
    } = await req.json();
    
    console.log('Vote received:', {
      promptId,
      modelAId,
      modelBId,
      winner,
      arenaType
    });
    
    // Just return a success response for the MVP
    return NextResponse.json({
      success: true,
      message: `Thank you for your vote! You selected ${winner === 'tie' ? 'a tie' : `model ${winner}`}.`
    });
  } catch (error) {
    console.error('Error in vote API:', error);
    return NextResponse.json(
      { error: 'Failed to process vote' },
      { status: 500 }
    );
  }
}
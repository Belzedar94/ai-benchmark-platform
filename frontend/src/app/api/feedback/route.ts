import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { type, feedback } = body;

    // In a real application, you would store this in a database
    // For now, we'll just log it
    console.log('Feedback received:', { type, feedback });

    // You could also send this to an external service or email
    // await sendToExternalService({ type, feedback });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to process feedback:', error);
    return NextResponse.json(
      { error: 'Failed to process feedback' },
      { status: 500 }
    );
  }
}
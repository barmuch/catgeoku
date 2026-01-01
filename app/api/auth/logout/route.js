import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    // With JWT, logout is handled client-side by removing the token
    // This endpoint exists for consistency and future enhancements
    return NextResponse.json({
      message: 'Logout successful',
    });
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { error: 'Logout failed' },
      { status: 500 }
    );
  }
}

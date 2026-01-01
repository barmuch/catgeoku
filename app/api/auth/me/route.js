import { NextResponse } from 'next/server';
import { authMiddleware } from '@/lib/auth';

async function getMe(request) {
  try {
    return NextResponse.json({
      user: {
        id: request.user.id,
        email: request.user.email,
        role: request.userData.role,
      },
    });
  } catch (error) {
    console.error('Get user error:', error);
    return NextResponse.json(
      { error: 'Failed to get user data' },
      { status: 500 }
    );
  }
}

export const GET = authMiddleware(getMe);

import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import connectDB from '@/lib/mongodb';
import User from '@/lib/models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

export async function verifyAuth(request) {
  try {
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return { error: 'Missing authorization token', status: 401 };
    }

    const token = authHeader.substring(7);
    
    // Verify JWT token
    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      return { error: 'Invalid or expired token', status: 401 };
    }

    // Connect to database
    await connectDB();

    // Get user from database
    const user = await User.findById(decoded.userId).select('-password');

    if (!user) {
      return { error: 'User not found', status: 401 };
    }

    // Check if user is admin
    if (user.role !== 'admin') {
      return { error: 'Unauthorized - Admin access required', status: 403 };
    }

    return { user, userData: user };
  } catch (error) {
    console.error('Auth verification error:', error);
    return { error: 'Authentication failed', status: 500 };
  }
}

export function authMiddleware(handler) {
  return async (request, context) => {
    const authResult = await verifyAuth(request);
    
    if (authResult.error) {
      return NextResponse.json(
        { error: authResult.error },
        { status: authResult.status }
      );
    }

    // Attach user to request for use in handler
    request.user = authResult.user;
    request.userData = authResult.userData;
    
    return handler(request, context);
  };
}

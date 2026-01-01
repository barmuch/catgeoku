import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Event from '@/lib/models/Event';

export async function GET(request) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '50');
    const upcoming = searchParams.get('upcoming') === 'true';

    const query = { published: true };

    // Filter for upcoming events only
    if (upcoming) {
      query.date = { $gte: new Date() };
    }

    const events = await Event.find(query)
      .sort({ date: 1 }) // Sort by date ascending (earliest first)
      .limit(limit)
      .lean();

    const formattedEvents = events.map(event => ({
      ...event,
      id: event._id.toString(),
      _id: event._id.toString(),
    }));

    return NextResponse.json({ events: formattedEvents });
  } catch (error) {
    console.error('GET /api/events error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

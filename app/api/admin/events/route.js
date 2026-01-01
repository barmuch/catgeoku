import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Event from '@/lib/models/Event';
import { verifyAuth } from '@/lib/auth';

// GET /api/admin/events - Get all events
export async function GET(request) {
  try {
    const authResult = await verifyAuth(request);
    if (authResult.error) {
      return NextResponse.json({ error: authResult.error }, { status: authResult.status });
    }

    await dbConnect();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const published = searchParams.get('published');

    const query = {};
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }
    if (published !== null && published !== '') {
      query.published = published === 'true';
    }

    const total = await Event.countDocuments(query);
    const events = await Event.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    const formattedEvents = events.map(event => ({
      ...event,
      id: event._id.toString(),
      _id: event._id.toString(),
    }));

    return NextResponse.json({
      events: formattedEvents,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('GET /api/admin/events error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST /api/admin/events - Create new event
export async function POST(request) {
  try {
    const authResult = await verifyAuth(request);
    if (authResult.error) {
      return NextResponse.json({ error: authResult.error }, { status: authResult.status });
    }

    await dbConnect();

    const body = await request.json();
    const { 
      title, 
      slug, 
      content, 
      excerpt, 
      description, 
      date, 
      endDate, 
      location, 
      featuredImage, 
      image, 
      tags, 
      author, 
      published 
    } = body;

    if (!title || !slug || !content || !date) {
      return NextResponse.json(
        { error: 'Missing required fields (title, slug, content, date)' },
        { status: 400 }
      );
    }

    const event = await Event.create({
      title,
      slug,
      content,
      excerpt,
      description,
      date: new Date(date),
      endDate: endDate ? new Date(endDate) : null,
      location,
      featuredImage: featuredImage || image,
      image: featuredImage || image,
      tags: Array.isArray(tags) ? tags : [],
      author,
      published: published || false,
      publishedAt: published ? new Date() : null,
    });

    return NextResponse.json({
      ...event.toObject(),
      id: event._id.toString(),
    }, { status: 201 });
  } catch (error) {
    console.error('POST /api/admin/events error:', error);
    if (error.code === 11000) {
      return NextResponse.json({ error: 'Event with this slug already exists' }, { status: 400 });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

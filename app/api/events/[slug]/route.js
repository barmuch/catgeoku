import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Event from '@/lib/models/Event';

export async function GET(request, { params }) {
  try {
    await dbConnect();

    const event = await Event.findOne({
      slug: params.slug,
      published: true,
    }).lean();

    if (!event) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      );
    }

    // Calculate read time from content (if HTML)
    const calculateReadTime = (content) => {
      if (!content) return '5 min read';
      const text = content.replace(/<[^>]+>/g, ''); // Strip HTML tags
      const wordsPerMinute = 200;
      const wordCount = text.split(/\s+/).length;
      const minutes = Math.ceil(wordCount / wordsPerMinute);
      return `${minutes} min read`;
    };

    const formattedEvent = {
      ...event,
      id: event._id.toString(),
      _id: event._id.toString(),
      readTime: calculateReadTime(event.content),
    };

    return NextResponse.json(formattedEvent);
  } catch (error) {
    console.error('GET /api/events/[slug] error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

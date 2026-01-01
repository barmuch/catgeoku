import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Event from '@/lib/models/Event';
import { verifyAuth } from '@/lib/auth';

// GET /api/admin/events/[id] - Get single event
export async function GET(request, { params }) {
  try {
    const authResult = await verifyAuth(request);
    if (authResult.error) {
      return NextResponse.json({ error: authResult.error }, { status: authResult.status });
    }

    await dbConnect();

    const event = await Event.findById(params.id).lean();
    if (!event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }

    return NextResponse.json({
      ...event,
      id: event._id.toString(),
    });
  } catch (error) {
    console.error('GET /api/admin/events/[id] error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PUT /api/admin/events/[id] - Update event
export async function PUT(request, { params }) {
  try {
    const authResult = await verifyAuth(request);
    if (authResult.error) {
      return NextResponse.json({ error: authResult.error }, { status: authResult.status });
    }

    await dbConnect();

    const body = await request.json();
    
    console.log('Received update request for event:', params.id);
    console.log('Content length:', body.content?.length);
    
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

    // Get existing event
    const existingEvent = await Event.findById(params.id);
    
    if (!existingEvent) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }

    const updateData = {
      title: title !== undefined ? title : existingEvent.title,
      slug: slug !== undefined ? slug : existingEvent.slug,
      content: content !== undefined ? content : existingEvent.content,
      excerpt: excerpt !== undefined ? excerpt : existingEvent.excerpt,
      description: description !== undefined ? description : existingEvent.description,
      date: date ? new Date(date) : existingEvent.date,
      endDate: endDate ? new Date(endDate) : existingEvent.endDate,
      location: location !== undefined ? location : existingEvent.location,
      featuredImage: featuredImage || image || existingEvent.featuredImage,
      image: featuredImage || image || existingEvent.image,
      tags: Array.isArray(tags) ? tags : existingEvent.tags,
      author: author !== undefined ? author : existingEvent.author,
      published: published !== undefined ? published : existingEvent.published,
      updatedAt: new Date(),
    };

    // Set publishedAt only if being published for the first time
    if (published && !existingEvent.published) {
      updateData.publishedAt = new Date();
    }
    
    console.log('Updating event with content length:', updateData.content?.length);

    const event = await Event.findByIdAndUpdate(
      params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }
    
    console.log('Event updated successfully, new content length:', event.content?.length);

    return NextResponse.json({
      ...event.toObject(),
      id: event._id.toString(),
    });
  } catch (error) {
    console.error('PUT /api/admin/events/[id] error:', error);
    if (error.code === 11000) {
      return NextResponse.json({ error: 'Event with this slug already exists' }, { status: 400 });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE /api/admin/events/[id] - Delete event
export async function DELETE(request, { params }) {
  try {
    const authResult = await verifyAuth(request);
    if (authResult.error) {
      return NextResponse.json({ error: authResult.error }, { status: authResult.status });
    }

    await dbConnect();

    const event = await Event.findByIdAndDelete(params.id);
    if (!event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error('DELETE /api/admin/events/[id] error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

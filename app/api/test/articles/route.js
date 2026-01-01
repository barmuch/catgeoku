import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Article from '@/lib/models/Article';

// Test endpoint to check MongoDB connection and data
export async function GET(request) {
  try {
    await connectDB();
    
    const articles = await Article.find().limit(5).lean();
    const count = await Article.countDocuments();
    
    return NextResponse.json({
      success: true,
      count,
      articles: articles.map(a => ({
        id: a._id.toString(),
        title: a.title,
        slug: a.slug,
        published: a.published
      }))
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}

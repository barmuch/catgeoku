import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Article from '@/lib/models/Article';

// GET single published article by slug
export async function GET(request, { params }) {
  try {
    await dbConnect();
    const { slug } = params;

    const article = await Article.findOne({ 
      slug,
      published: true,
    })
    .populate('categoryId', 'name slug icon')
    .lean();

    if (!article) {
      return NextResponse.json(
        { error: 'Article not found' },
        { status: 404 }
      );
    }

    // Format response
    const formattedArticle = {
      ...article,
      id: article._id.toString(),
      category: article.categoryId ? {
        id: article.categoryId._id.toString(),
        name: article.categoryId.name,
        slug: article.categoryId.slug,
        icon: article.categoryId.icon,
      } : null,
      tags: article.tags || [],
      date: article.createdAt,
      readTime: calculateReadTime(article.content),
    };

    return NextResponse.json(formattedArticle);
  } catch (error) {
    console.error('GET /api/posts/[slug] error:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

function calculateReadTime(content) {
  const wordsPerMinute = 200;
  const textContent = content.replace(/<[^>]+>/g, ''); // Strip HTML tags
  const wordCount = textContent.split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes} min read`;
}

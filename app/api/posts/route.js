import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Article from '@/lib/models/Article';

// GET all published articles (public endpoint)
export async function GET(request) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const categorySlug = searchParams.get('category');
    const tag = searchParams.get('tag');
    const featured = searchParams.get('featured');

    const skip = (page - 1) * limit;

    const where = {
      published: true,
      ...(search && {
        $or: [
          { title: { $regex: search, $options: 'i' } },
          { excerpt: { $regex: search, $options: 'i' } },
        ],
      }),
      ...(categorySlug && {
        category: { $regex: categorySlug, $options: 'i' },
      }),
      ...(tag && {
        tags: tag,
      }),
    };

    const [articles, total] = await Promise.all([
      Article.find(where)
        .skip(skip)
        .limit(limit)
        .sort({ publishedAt: -1, createdAt: -1 })
        .populate('categoryId')
        .lean(),
      Article.countDocuments(where),
    ]);

    // Format articles to match old posts structure
    const formattedArticles = articles.map(article => ({
      slug: article.slug,
      title: article.title,
      excerpt: article.excerpt || '',
      content: article.content,
      coverImage: article.featuredImage || '/images/placeholder.jpg',
      date: article.publishedAt?.toISOString() || article.createdAt.toISOString(),
      category: article.category || article.categoryId?.name || 'General',
      categorySlug: article.categoryId?.slug || 'general',
      author: article.author || 'CatGeoUku Team',
      readTime: calculateReadTime(article.content),
      tags: article.tags || [],
      id: article._id,
    }));

    return NextResponse.json({
      articles: formattedArticles,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching articles:', error);
    return NextResponse.json(
      { error: 'Failed to fetch articles' },
      { status: 500 }
    );
  }
}

// Helper function to calculate read time
function calculateReadTime(content) {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}

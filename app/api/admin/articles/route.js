import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Article from '@/lib/models/Article';
import { authMiddleware } from '@/lib/auth';

// GET all articles (with filters)
export async function GET(request) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const categoryId = searchParams.get('categoryId');
    const published = searchParams.get('published');

    const skip = (page - 1) * limit;

    const where = {
      ...(search && {
        $or: [
          { title: { $regex: search, $options: 'i' } },
          { excerpt: { $regex: search, $options: 'i' } },
        ],
      }),
      ...(categoryId && { categoryId }),
      ...(published !== null && published !== undefined && { 
        published: published === 'true' 
      }),
    };

    const [articles, total] = await Promise.all([
      Article.find(where)
        .skip(skip)
        .limit(limit)
        .populate('categoryId')
        .sort({ createdAt: -1 })
        .lean(),
      Article.countDocuments(where),
    ]);

    // Format articles to include 'id' field for frontend compatibility
    const formattedArticles = articles.map(article => ({
      ...article,
      id: article._id.toString(),
      category: article.categoryId ? {
        id: article.categoryId._id?.toString(),
        name: article.categoryId.name,
        slug: article.categoryId.slug,
      } : null,
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

// POST create new article (protected)
async function createArticle(request) {
  try {
    await connectDB();
    
    const body = await request.json();
    const {
      title,
      slug,
      excerpt,
      content,
      featuredImage,
      published,
      categoryId,
      category,
      tags,
    } = body;

    // Validate required fields
    if (!title || !slug || !content) {
      return NextResponse.json(
        { error: 'Title, slug, and content are required' },
        { status: 400 }
      );
    }

    // Check if slug already exists
    const existingArticle = await Article.findOne({ slug });

    if (existingArticle) {
      return NextResponse.json(
        { error: 'Article with this slug already exists' },
        { status: 400 }
      );
    }

    // Create article
    const article = await Article.create({
      title,
      slug,
      excerpt,
      content,
      featuredImage,
      published: published || false,
      publishedAt: published ? new Date() : null,
      categoryId: categoryId || null,
      category: category || '',
      author: request.user.username || 'Admin',
      tags: tags || [],
    });

    // Populate category
    await article.populate('categoryId');

    return NextResponse.json(article, { status: 201 });
  } catch (error) {
    console.error('Error creating article:', error);
    return NextResponse.json(
      { error: 'Failed to create article' },
      { status: 500 }
    );
  }
}

export const POST = authMiddleware(createArticle);

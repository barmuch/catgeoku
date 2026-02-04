import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Article from '@/lib/models/Article';
import { authMiddleware } from '@/lib/auth';

// GET single article by ID
export async function GET(request, { params }) {
  try {
    await connectDB();
    const { id } = params;

    const article = await Article.findById(id).lean();

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
      category: article.category || '',
    };

    return NextResponse.json(formattedArticle);
  } catch (error) {
    console.error('Error fetching article:', error);
    return NextResponse.json(
      { error: 'Failed to fetch article' },
      { status: 500 }
    );
  }
}

// PUT update article (protected)
async function updateArticle(request, { params }) {
  try {
    await connectDB();
    const { id } = params;
    const body = await request.json();
    
    console.log('Received update request for article:', id);
    console.log('Content length:', body.content?.length);
    
    const {
      title,
      slug,
      excerpt,
      content,
      featuredImage,
      published,
      category,
      tags,
      author,
    } = body;

    // Check if article exists
    const existingArticle = await Article.findById(id);

    if (!existingArticle) {
      return NextResponse.json(
        { error: 'Article not found' },
        { status: 404 }
      );
    }

    // If slug is being changed, check if it's already in use
    if (slug && slug !== existingArticle.slug) {
      const slugInUse = await Article.findOne({ slug, _id: { $ne: id } });

      if (slugInUse) {
        return NextResponse.json(
          { error: 'Article with this slug already exists' },
          { status: 400 }
        );
      }
    }

    // Update article - use explicit checks
    const updateData = {
      title,
      slug,
      excerpt: excerpt !== undefined ? excerpt : existingArticle.excerpt,
      content: content !== undefined ? content : existingArticle.content,
      featuredImage: featuredImage !== undefined ? featuredImage : existingArticle.featuredImage,
      published: published !== undefined ? published : existingArticle.published,
      category: category !== undefined ? category : existingArticle.category,
      tags: tags !== undefined ? tags : existingArticle.tags,
      author: author !== undefined ? author : existingArticle.author,
      updatedAt: new Date(),
    };
    
    // Set publishedAt if being published for the first time
    if (published && !existingArticle.published) {
      updateData.publishedAt = new Date();
    }
    
    console.log('Updating article with content length:', updateData.content?.length);

    const article = await Article.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).lean();
    
    console.log('Article updated successfully, new content length:', article.content?.length);

    // Format response
    const formattedArticle = {
      ...article,
      id: article._id.toString(),
      category: article.category || '',
    };

    return NextResponse.json(formattedArticle);
  } catch (error) {
    console.error('Error updating article:', error);
    return NextResponse.json(
      { error: 'Failed to update article' },
      { status: 500 }
    );
  }
}

// DELETE article (protected)
async function deleteArticle(request, { params }) {
  try {
    await connectDB();
    const { id } = params;

    // Check if article exists
    const existingArticle = await Article.findById(id);

    if (!existingArticle) {
      return NextResponse.json(
        { error: 'Article not found' },
        { status: 404 }
      );
    }

    // Delete article
    await Article.findByIdAndDelete(id);

    return NextResponse.json(
      { message: 'Article deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting article:', error);
    return NextResponse.json(
      { error: 'Failed to delete article' },
      { status: 500 }
    );
  }
}

export const PUT = authMiddleware(updateArticle);
export const DELETE = authMiddleware(deleteArticle);

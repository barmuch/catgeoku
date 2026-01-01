import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Category from '@/lib/models/Category';
import Article from '@/lib/models/Article';

// GET all categories with article counts
export async function GET() {
  try {
    await connectDB();
    
    const categories = await Category.find().sort({ name: 1 }).lean();

    const formattedCategories = await Promise.all(
      categories.map(async (category) => {
        const count = await Article.countDocuments({
          categoryId: category._id,
          published: true,
        });
        
        return {
          id: category._id,
          name: category.name,
          slug: category.slug,
          description: category.description,
          icon: category.icon,
          count,
        };
      })
    );

    return NextResponse.json({ categories: formattedCategories });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}

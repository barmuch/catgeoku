import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Category from '@/lib/models/Category';
import Article from '@/lib/models/Article';
import { authMiddleware } from '@/lib/auth';

// GET all categories
export async function GET(request) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const includeCount = searchParams.get('includeCount') === 'true';

    const categories = await Category.find().sort({ name: 1 }).lean();

    if (includeCount) {
      const categoriesWithCount = await Promise.all(
        categories.map(async (cat) => {
          const count = await Article.countDocuments({ categoryId: cat._id });
          return { 
            ...cat, 
            id: cat._id.toString(),
            articleCount: count 
          };
        })
      );
      return NextResponse.json({ categories: categoriesWithCount });
    }

    // Add 'id' field for frontend compatibility
    const formattedCategories = categories.map(cat => ({
      ...cat,
      id: cat._id.toString(),
    }));

    return NextResponse.json({ categories: formattedCategories });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}

// POST create new category (protected)
async function createCategory(request) {
  try {
    await connectDB();
    
    const body = await request.json();
    const { name, slug, description, icon } = body;

    // Validate required fields
    if (!name || !slug) {
      return NextResponse.json(
        { error: 'Name and slug are required' },
        { status: 400 }
      );
    }

    // Check if slug already exists
    const existingCategory = await Category.findOne({ slug });

    if (existingCategory) {
      return NextResponse.json(
        { error: 'Category with this slug already exists' },
        { status: 400 }
      );
    }

    // Create category
    const category = await Category.create({
      name,
      slug,
      description,
      icon,
    });

    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    console.error('Error creating category:', error);
    return NextResponse.json(
      { error: 'Failed to create category' },
      { status: 500 }
    );
  }
}

export const POST = authMiddleware(createCategory);

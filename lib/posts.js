import connectDB from '@/lib/mongodb';
import Article from '@/lib/models/Article';
import Category from '@/lib/models/Category';

export async function getAllPosts() {
  try {
    await connectDB();
    
    const articles = await Article.find({ published: true })
      .populate('categoryId')
      .sort({ publishedAt: -1, createdAt: -1 })
      .lean();

    return articles.map(article => ({
      slug: article.slug,
      content: article.content,
      title: article.title,
      date: article.publishedAt || article.createdAt,
      category: article.category || article.categoryId?.name || 'General',
      excerpt: article.excerpt || '',
      coverImage: article.featuredImage || '/images/placeholder.jpg',
      author: article.author || 'catgeoku Team',
      readTime: calculateReadTime(article.content),
      tags: article.tags || [],
    }));
  } catch (error) {
    console.error('Error reading posts:', error);
    return [];
  }
}

export async function getPostBySlug(slug) {
  try {
    await connectDB();
    
    const article = await Article.findOne({ slug, published: true })
      .populate('categoryId')
      .lean();

    if (!article) return null;

    return {
      slug: article.slug,
      content: article.content,
      title: article.title,
      date: article.publishedAt || article.createdAt,
      category: article.category || article.categoryId?.name || 'General',
      excerpt: article.excerpt || '',
      coverImage: article.featuredImage || '/images/placeholder.jpg',
      author: article.author || 'catgeoku Team',
      readTime: calculateReadTime(article.content),
      tags: article.tags || [],
    };
  } catch (error) {
    console.error('Error reading post:', error);
    return null;
  }
}

export async function getPostsByCategory(category) {
  try {
    await connectDB();
    
    const articles = await Article.find({ 
      published: true,
      $or: [
        { category: new RegExp(category, 'i') },
      ]
    })
      .populate('categoryId')
      .sort({ publishedAt: -1, createdAt: -1 })
      .lean();

    return articles.map(article => ({
      slug: article.slug,
      content: article.content,
      title: article.title,
      date: article.publishedAt || article.createdAt,
      category: article.category || article.categoryId?.name || 'General',
      excerpt: article.excerpt || '',
      coverImage: article.featuredImage || '/images/placeholder.jpg',
      author: article.author || 'catgeoku Team',
      readTime: calculateReadTime(article.content),
      tags: article.tags || [],
    }));
  } catch (error) {
    console.error('Error reading posts by category:', error);
    return [];
  }
}

export async function getAllCategories() {
  try {
    await connectDB();
    
    const categories = await Category.find().lean();
    
    // Count articles per category
    const categoriesWithCount = await Promise.all(
      categories.map(async (cat) => {
        const count = await Article.countDocuments({ 
          published: true,
          categoryId: cat._id 
        });
        
        return {
          name: cat.name,
          slug: cat.slug,
          count,
          description: cat.description,
          icon: cat.icon,
        };
      })
    );

    return categoriesWithCount;
  } catch (error) {
    console.error('Error getting categories:', error);
    return [];
  }
}

export async function getRelatedPosts(slug, category, limit = 3) {
  try {
    await connectDB();
    
    const articles = await Article.find({ 
      published: true,
      slug: { $ne: slug },
      category: new RegExp(category, 'i')
    })
      .limit(limit)
      .sort({ publishedAt: -1, createdAt: -1 })
      .lean();

    return articles.map(article => ({
      slug: article.slug,
      content: article.content,
      title: article.title,
      date: article.publishedAt || article.createdAt,
      category: article.category || 'General',
      excerpt: article.excerpt || '',
      coverImage: article.featuredImage || '/images/placeholder.jpg',
      author: article.author || 'catgeoku Team',
      readTime: calculateReadTime(article.content),
      tags: article.tags || [],
    }));
  } catch (error) {
    console.error('Error getting related posts:', error);
    return [];
  }
}

function calculateReadTime(content) {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}

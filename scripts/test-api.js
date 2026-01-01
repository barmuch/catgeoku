// Test API connectivity and data
const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

async function testAPI() {
  try {
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Import models
    const Article = require('../lib/models/Article');
    const Category = require('../lib/models/Category');

    // Test 1: Count all articles
    const articleCount = await Article.countDocuments();
    console.log(`\n📊 Total articles in database: ${articleCount}`);

    // Test 2: Get all categories
    const categories = await Category.find();
    console.log(`\n📁 Categories (${categories.length}):`);
    categories.forEach(cat => {
      console.log(`  - ${cat.name} (${cat.slug})`);
    });

    // Test 3: Get articles with category
    const articles = await Article.find()
      .populate('categoryId')
      .limit(5)
      .sort({ createdAt: -1 });
    
    console.log(`\n📝 Latest 5 articles:`);
    articles.forEach((article, index) => {
      console.log(`  ${index + 1}. ${article.title}`);
      console.log(`     Category: ${article.categoryId?.name || 'No category'}`);
      console.log(`     Published: ${article.published}`);
      console.log(`     Slug: ${article.slug}`);
      console.log('');
    });

    // Test 4: Group articles by category
    console.log('\n📊 Articles by Category:');
    for (const category of categories) {
      const count = await Article.countDocuments({ categoryId: category._id });
      console.log(`  - ${category.name}: ${count} articles`);
    }

    await mongoose.connection.close();
    console.log('\n✅ Test completed successfully!');
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

testAPI();

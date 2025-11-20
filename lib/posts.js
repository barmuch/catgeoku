import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'content/posts')

export function getAllPosts() {
  try {
    const fileNames = fs.readdirSync(postsDirectory)
    const allPosts = fileNames
      .filter(fileName => fileName.endsWith('.md'))
      .map(fileName => {
        const slug = fileName.replace(/\.md$/, '')
        const fullPath = path.join(postsDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        const { data, content } = matter(fileContents)

        return {
          slug,
          content,
          title: data.title || 'Untitled',
          date: data.date || new Date().toISOString(),
          category: data.category || 'General',
          excerpt: data.excerpt || '',
          coverImage: data.coverImage || '/images/placeholder.jpg',
          author: data.author || 'catgeoku Team',
          readTime: data.readTime || '5 min read',
          tags: data.tags || [],
        }
      })

    return allPosts.sort((a, b) => new Date(b.date) - new Date(a.date))
  } catch (error) {
    console.error('Error reading posts:', error)
    return []
  }
}

export function getPostBySlug(slug) {
  const posts = getAllPosts()
  return posts.find(post => post.slug === slug)
}

export function getPostsByCategory(category) {
  const posts = getAllPosts()
  return posts.filter(post => 
    post.category.toLowerCase().replace(/\s+/g, '-') === category.toLowerCase()
  )
}

export function getAllCategories() {
  const posts = getAllPosts()
  const categories = {}
  
  posts.forEach(post => {
    const category = post.category
    if (!categories[category]) {
      categories[category] = {
        name: category,
        slug: category.toLowerCase().replace(/\s+/g, '-'),
        count: 0
      }
    }
    categories[category].count++
  })

  return Object.values(categories)
}

export function getRelatedPosts(slug, category, limit = 3) {
  const posts = getAllPosts()
  return posts
    .filter(post => post.slug !== slug && post.category === category)
    .slice(0, limit)
}

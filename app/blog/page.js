import Image from 'next/image'
import Link from 'next/link'
import { getAllPosts, getAllCategories } from '@/lib/posts'
import { Calendar, Clock, ArrowRight, Search, Filter } from 'lucide-react'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata = {
  title: 'Blog - All Articles',
  description: 'Browse all engineering articles, tutorials, and technical resources on geology, geophysics, drilling, and petroleum engineering.',
}

export default async function BlogPage() {
  const allPosts = await getAllPosts()
  const categories = await getAllCategories()

  return (
    <div className="min-h-screen bg-primary-50 dark:bg-primary-950 pt-20">
      {/* Header */}
      <section className="bg-gradient-to-br from-primary-900 to-primary-800 dark:from-primary-950 dark:to-primary-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6">
              Engineering Knowledge Base
            </h1>
            <p className="text-xl text-primary-200 max-w-3xl mx-auto">
              {allPosts.length} articles covering geology, geophysics, drilling, petroleum engineering, and more.
            </p>
          </div>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center space-x-2 mb-4">
          <Filter className="w-5 h-5 text-primary-600 dark:text-primary-400" />
          <span className="font-semibold text-primary-900 dark:text-white">Filter by Category:</span>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/blog"
            className="px-4 py-2 bg-accent-500 text-white rounded-lg font-semibold hover:bg-accent-600 transition-colors"
          >
            All Articles ({allPosts.length})
          </Link>
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/${category.slug}`}
              className="px-4 py-2 bg-white dark:bg-primary-800 text-primary-700 dark:text-primary-200 rounded-lg font-semibold border border-primary-200 dark:border-primary-700 hover:border-accent-500 hover:text-accent-600 dark:hover:text-accent-400 transition-colors"
            >
              {category.name} ({category.count})
            </Link>
          ))}
        </div>
      </section>

      {/* Articles Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allPosts.map((post, index) => (
            <article
              key={post.slug}
              className="card-hover overflow-hidden group animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={post.coverImage || '/placeholder.svg'}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <Link
                    href={`/${post.category.toLowerCase().replace(/\s+/g, '-')}`}
                    className="badge bg-accent-500 text-white hover:bg-accent-600 transition-colors"
                  >
                    {post.category}
                  </Link>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Meta */}
                <div className="flex items-center space-x-4 text-sm text-primary-500 dark:text-primary-400 mb-3">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(post.date).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric', 
                      year: 'numeric' 
                    })}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-display font-bold text-primary-900 dark:text-white mb-3 group-hover:text-accent-600 dark:group-hover:text-accent-400 transition-colors line-clamp-2">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-primary-600 dark:text-primary-300 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                {/* Author */}
                <div className="flex items-center justify-between pt-4 border-t border-primary-200 dark:border-primary-700">
                  <span className="text-sm text-primary-600 dark:text-primary-400">
                    By {post.author}
                  </span>
                  
                  {/* Read More Link */}
                  <Link
                    href={`/posts/${post.slug}`}
                    className="inline-flex items-center space-x-2 text-accent-600 dark:text-accent-400 font-semibold group-hover:space-x-3 transition-all duration-300"
                  >
                    <span>Read</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-gradient-to-br from-accent-500 to-accent-700 rounded-3xl shadow-2xl p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
            Never Miss an Article
          </h2>
          <p className="text-xl text-accent-100 mb-8 max-w-2xl mx-auto">
            Get weekly updates on new articles, tools, and engineering insights delivered to your inbox.
          </p>
          <Link
            href="/#newsletter"
            className="inline-flex items-center space-x-2 px-8 py-4 bg-white text-accent-600 rounded-xl font-semibold hover:bg-accent-50 transition-colors shadow-lg"
          >
            <span>Subscribe to Newsletter</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}

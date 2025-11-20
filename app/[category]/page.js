import Image from 'next/image'
import Link from 'next/link'
import { getPostsByCategory } from '@/lib/posts'
import { Calendar, Clock, ArrowRight } from 'lucide-react'

const categoryData = {
  geology: {
    title: 'Geology',
    description: 'Explore the fundamentals of geological engineering, earth sciences, structural analysis, and mineralogy.',
    color: 'from-blue-500 to-blue-700',
  },
  geophysics: {
    title: 'Geophysics',
    description: 'Seismic analysis, electromagnetic methods, gravity surveys, and advanced geophysical data interpretation.',
    color: 'from-purple-500 to-purple-700',
  },
  'drilling-engineering': {
    title: 'Drilling Engineering',
    description: 'Drilling operations, well planning, completion techniques, and drilling optimization strategies.',
    color: 'from-orange-500 to-orange-700',
  },
  'petroleum-engineering': {
    title: 'Petroleum Engineering',
    description: 'Reservoir engineering, production optimization, enhanced oil recovery, and field development.',
    color: 'from-green-500 to-green-700',
  },
  science: {
    title: 'Science',
    description: 'Scientific research, discoveries, interdisciplinary studies, and emerging technologies.',
    color: 'from-pink-500 to-pink-700',
  },
}

export async function generateStaticParams() {
  return Object.keys(categoryData).map((category) => ({
    category,
  }))
}

export function generateMetadata({ params }) {
  const data = categoryData[params.category]
  if (!data) return {}

  return {
    title: `${data.title} Articles`,
    description: data.description,
  }
}

export default function CategoryPage({ params }) {
  const data = categoryData[params.category]
  const posts = getPostsByCategory(params.category)

  if (!data) {
    return <div>Category not found</div>
  }

  return (
    <div className="min-h-screen bg-primary-50 dark:bg-primary-950 pt-20">
      {/* Header */}
      <div className={`bg-gradient-to-br ${data.color} py-20`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6">
            {data.title}
          </h1>
          <p className="text-xl text-white/90 max-w-3xl">
            {data.description}
          </p>
          <div className="mt-8 text-white/90 font-semibold">
            {posts.length} {posts.length === 1 ? 'Article' : 'Articles'}
          </div>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-primary-600 dark:text-primary-400 mb-6">
              No articles found in this category yet.
            </p>
            <Link href="/blog" className="btn-primary">
              Explore All Articles
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <article
                key={post.slug}
                className="card-hover overflow-hidden group animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
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

                  {/* Read More Link */}
                  <Link
                    href={`/posts/${post.slug}`}
                    className="inline-flex items-center space-x-2 text-accent-600 dark:text-accent-400 font-semibold group-hover:space-x-3 transition-all duration-300"
                  >
                    <span>Read More</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

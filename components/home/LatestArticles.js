'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Clock, ArrowRight } from 'lucide-react'

export default function LatestArticles({ posts }) {
  return (
    <section id="articles" className="section-container bg-white dark:bg-primary-900">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-primary-900 dark:text-white mb-4">
          Latest Articles
        </h2>
        <p className="text-lg text-primary-600 dark:text-primary-300 max-w-2xl mx-auto">
          Stay updated with the latest insights, tutorials, and technical knowledge
          from the world of engineering.
        </p>
      </div>

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
                src={post.coverImage || '/images/placeholder.jpg'}
                alt={post.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              
              {/* Category Badge */}
              <div className="absolute top-4 left-4">
                <span className="badge bg-accent-500 text-white">
                  {post.category}
                </span>
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

      {/* View All Button */}
      <div className="text-center mt-12">
        <Link href="/blog" className="btn-outline">
          View All Articles
          <ArrowRight className="inline-block w-5 h-5 ml-2" />
        </Link>
      </div>
    </section>
  )
}

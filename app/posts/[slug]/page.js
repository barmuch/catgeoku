import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getPostBySlug, getRelatedPosts, getAllPosts } from '@/lib/posts'
import { markdownToHtml, generateMetadata as generatePostMetadata, generateStructuredData } from '@/lib/markdown'
import { Calendar, Clock, User, ArrowLeft, ArrowRight, Tag } from 'lucide-react'
import 'katex/dist/katex.min.css'
import 'highlight.js/styles/github-dark.css'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }) {
  const post = await getPostBySlug(params.slug)
  if (!post) return {}
  return generatePostMetadata(post)
}

export default async function PostPage({ params }) {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  const contentHtml = await markdownToHtml(post.content)
  const relatedPosts = await getRelatedPosts(post.slug, post.category)
  const structuredData = generateStructuredData(post)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <article className="min-h-screen bg-white dark:bg-primary-900 pt-20">
        {/* Hero Section */}
        <div className="relative h-[60vh] min-h-[400px] max-h-[600px] overflow-hidden">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
          
          <div className="absolute inset-0 flex items-end">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
              <Link
                href="/blog"
                className="inline-flex items-center space-x-2 text-white/90 hover:text-white mb-6 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Articles</span>
              </Link>

              <div className="mb-4">
                <span className="badge bg-accent-500 text-white text-sm">
                  {post.category}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6 leading-tight">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-6 text-white/90">
                <div className="flex items-center space-x-2">
                  <User className="w-5 h-5" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5" />
                  <span>{new Date(post.date).toLocaleDateString('en-US', { 
                    month: 'long', 
                    day: 'numeric', 
                    year: 'numeric' 
                  })}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5" />
                  <span>{post.readTime}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Excerpt */}
          <div className="text-xl text-primary-600 dark:text-primary-300 mb-12 pb-12 border-b border-primary-200 dark:border-primary-700 leading-relaxed">
            {post.excerpt}
          </div>

          {/* Article Content */}
          <div 
            className="prose prose-lg dark:prose-invert max-w-none
              prose-headings:font-display prose-headings:font-bold
              prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
              prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
              prose-p:text-primary-700 dark:prose-p:text-primary-300 prose-p:leading-relaxed
              prose-a:text-accent-600 dark:prose-a:text-accent-400 prose-a:no-underline hover:prose-a:underline
              prose-code:text-accent-600 dark:prose-code:text-accent-400 prose-code:bg-primary-100 dark:prose-code:bg-primary-800 prose-code:px-2 prose-code:py-1 prose-code:rounded
              prose-pre:bg-primary-900 prose-pre:border prose-pre:border-primary-700
              prose-img:rounded-2xl prose-img:shadow-lg
              prose-blockquote:border-l-4 prose-blockquote:border-accent-500 prose-blockquote:bg-primary-50 dark:prose-blockquote:bg-primary-800 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-lg"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-12 pt-12 border-t border-primary-200 dark:border-primary-700">
              <div className="flex items-center flex-wrap gap-3">
                <Tag className="w-5 h-5 text-primary-500" />
                {post.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/tags/${tag.toLowerCase()}`}
                    className="px-4 py-2 bg-primary-100 dark:bg-primary-800 text-primary-700 dark:text-primary-300 rounded-lg hover:bg-accent-100 dark:hover:bg-accent-900/30 hover:text-accent-700 dark:hover:text-accent-400 transition-colors"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="bg-primary-50 dark:bg-primary-950 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-display font-bold text-primary-900 dark:text-white mb-8">
                Related Articles
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedPosts.map((relatedPost) => (
                  <Link
                    key={relatedPost.slug}
                    href={`/posts/${relatedPost.slug}`}
                    className="card-hover overflow-hidden group"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={relatedPost.coverImage}
                        alt={relatedPost.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-display font-bold text-primary-900 dark:text-white mb-2 group-hover:text-accent-600 dark:group-hover:text-accent-400 transition-colors line-clamp-2">
                        {relatedPost.title}
                      </h3>
                      <p className="text-primary-600 dark:text-primary-300 line-clamp-2">
                        {relatedPost.excerpt}
                      </p>
                      <div className="flex items-center space-x-2 mt-4 text-accent-600 dark:text-accent-400 font-semibold group-hover:space-x-3 transition-all">
                        <span>Read More</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </article>
    </>
  )
}

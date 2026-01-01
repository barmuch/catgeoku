'use client';

import { useEffect, useState } from 'react';
import { useParams, notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, User, Tag } from 'lucide-react';
import ArticleContent from '@/components/common/ArticleContent';

export default function ArticlePage() {
  const params = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchArticle();
  }, [params.slug]);

  const fetchArticle = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/posts/${params.slug}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Article not found');
      }

      setArticle(data);
    } catch (err) {
      console.error('Error fetching article:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-primary-900 pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-600 mx-auto mb-4"></div>
          <p className="text-primary-600 dark:text-primary-400">Loading article...</p>
        </div>
      </div>
    );
  }

  if (error || !article) {
    notFound();
  }

  return (
    <article className="min-h-screen bg-white dark:bg-primary-900 pt-20">
      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[400px] max-h-[600px] overflow-hidden bg-gradient-to-br from-primary-900 to-primary-800">
        {article.featuredImage && (
          <Image
            src={article.featuredImage}
            alt={article.title}
            fill
            priority
            className="object-cover opacity-40"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-primary-900 via-transparent to-transparent" />
        
        <div className="relative h-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-12">
          {article.category && (
            <Link
              href={`/${article.category.slug}`}
              className="inline-flex items-center space-x-2 text-accent-400 hover:text-accent-300 mb-4 w-fit"
            >
              {article.category.icon && <span className="text-2xl">{article.category.icon}</span>}
              <span className="font-semibold">{article.category.name}</span>
            </Link>
          )}
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6 leading-tight">
            {article.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-6 text-primary-200">
            {article.author && (
              <div className="flex items-center space-x-2">
                <User className="w-5 h-5" />
                <span>{article.author}</span>
              </div>
            )}
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5" />
              <span>{new Date(article.date).toLocaleDateString('en-US', { 
                month: 'long', 
                day: 'numeric', 
                year: 'numeric' 
              })}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5" />
              <span>{article.readTime}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Excerpt */}
        {article.excerpt && (
          <div className="text-xl text-primary-600 dark:text-primary-300 mb-12 pb-12 border-b border-primary-200 dark:border-primary-700 leading-relaxed">
            {article.excerpt}
          </div>
        )}

        {/* Article Content */}
        <ArticleContent content={article.content} />

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="mt-12 pt-12 border-t border-primary-200 dark:border-primary-700">
            <div className="flex items-center flex-wrap gap-3">
              <Tag className="w-5 h-5 text-primary-500" />
              {article.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-primary-100 dark:bg-primary-800 text-primary-700 dark:text-primary-300 rounded-lg"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}

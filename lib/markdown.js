import { remark } from 'remark'
import html from 'remark-html'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import rehypeHighlight from 'rehype-highlight'

export async function markdownToHtml(markdown) {
  const result = await remark()
    .use(remarkMath)
    .use(html, { sanitize: false })
    .use(rehypeKatex)
    .use(rehypeHighlight)
    .process(markdown)
    
  return result.toString()
}

export function generateStructuredData(post) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: post.coverImage,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'catgeoku',
      logo: {
        '@type': 'ImageObject',
        url: 'https://catgeoku.com/logo.png',
      },
    },
  }
}

export function generateMetadata(post) {
  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.tags,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      images: [
        {
          url: post.coverImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage],
    },
  }
}

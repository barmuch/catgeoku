'use client';

import { useEffect } from 'react';

export default function ArticleContent({ content }) {
  useEffect(() => {
    // Add target="_blank" to all links
    const links = document.querySelectorAll('.article-content a');
    links.forEach(link => {
      if (!link.getAttribute('href')?.startsWith('#')) {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
      }
    });
  }, [content]);

  return (
    <div 
      className="article-content prose prose-lg dark:prose-invert max-w-none"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}

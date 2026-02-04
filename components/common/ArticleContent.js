'use client';

import { useEffect } from 'react';
import 'katex/dist/katex.min.css';
import katex from 'katex';

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

    // Render KaTeX for TipTap formula placeholders
    const formulaNodes = document.querySelectorAll('.article-content span[data-latex]');
    formulaNodes.forEach(node => {
      const latex = node.getAttribute('data-latex') || '';
      if (!latex) return;
      try {
        node.innerHTML = katex.renderToString(latex, { throwOnError: false });
      } catch {
        // leave as-is
      }
    });
  }, [content]);

  return (
    <>
      <div 
        className="article-content prose prose-lg dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: content }}
      />
      <style jsx global>{`
        /* Image alignment support */
        .article-content img {
          max-width: 100%;
          height: auto;
          display: block;
          margin: 1rem auto;
        }
        
        /* Support inline style for centered images */
        .article-content img[style*="margin-left: auto"][style*="margin-right: auto"],
        .article-content img[style*="margin-left:auto"][style*="margin-right:auto"],
        .article-content img[style*="margin: 0 auto"],
        .article-content img[style*="margin:0 auto"],
        .article-content img[style*="margin: auto"],
        .article-content img[style*="margin:auto"] {
          display: block !important;
          margin-left: auto !important;
          margin-right: auto !important;
        }
        
        /* Support Quill alignment classes */
        .article-content .ql-align-center,
        .article-content p.ql-align-center {
          text-align: center;
        }
        
        .article-content .ql-align-center img,
        .article-content p.ql-align-center img {
          display: block;
          margin-left: auto;
          margin-right: auto;
        }
        
        .article-content .ql-align-right {
          text-align: right;
        }
        
        .article-content .ql-align-right img {
          display: block;
          margin-left: auto;
        }
        
        .article-content .ql-align-left {
          text-align: left;
        }
        
        .article-content .ql-align-left img {
          display: block;
          margin-right: auto;
        }
        
        /* Preserve all inline styles on images */
        .article-content img[style] {
          /* Ensure inline styles are respected */
        }

        /* Support TipTap image alignment attribute */
        .article-content img[data-align="center"] {
          display: block;
          margin-left: auto;
          margin-right: auto;
        }

        .article-content img[data-align="left"] {
          display: block;
          margin-right: auto;
          margin-left: 0;
        }

        .article-content img[data-align="right"] {
          display: block;
          margin-left: auto;
          margin-right: 0;
        }
        
        /* Formula support */
        .article-content .ql-formula {
          display: inline-block;
        }

        .article-content span[data-latex] {
          display: inline-block;
        }
      `}</style>
    </>
  );
}

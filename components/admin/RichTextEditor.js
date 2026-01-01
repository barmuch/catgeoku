'use client';

import { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const modules = {
  toolbar: [
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    [{ 'font': [] }],
    [{ 'size': ['small', false, 'large', 'huge'] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ 'color': [] }, { 'background': [] }],
    [{ 'script': 'sub'}, { 'script': 'super' }],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'indent': '-1'}, { 'indent': '+1' }],
    [{ 'align': [] }],
    ['blockquote', 'code-block'],
    ['link', 'image', 'video'],
    ['clean']
  ],
  clipboard: {
    matchVisual: false,
  }
};

const formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike',
  'color', 'background',
  'script',
  'list', 'bullet',
  'indent',
  'align',
  'blockquote', 'code-block',
  'link', 'image', 'video'
];

export default function RichTextEditor({ value, onChange, placeholder }) {
  const quillRef = useRef(null);

  return (
    <div className="rich-text-editor">
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={value || ''}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder || 'Write your content here...'}
        className="bg-white dark:bg-primary-700 rounded-lg"
      />
      <style jsx global>{`
        .rich-text-editor .ql-container {
          min-height: 300px;
          font-size: 16px;
        }
        
        .rich-text-editor .ql-editor {
          min-height: 300px;
        }
        
        .dark .ql-toolbar {
          background: rgb(51 65 85);
          border-color: rgb(71 85 105) !important;
        }
        
        .dark .ql-container {
          border-color: rgb(71 85 105) !important;
        }
        
        .dark .ql-editor {
          color: rgb(248 250 252);
        }
        
        .dark .ql-stroke {
          stroke: rgb(203 213 225);
        }
        
        .dark .ql-fill {
          fill: rgb(203 213 225);
        }
        
        .dark .ql-picker-label {
          color: rgb(203 213 225);
        }
        
        .dark .ql-picker-options {
          background: rgb(51 65 85);
          border-color: rgb(71 85 105);
        }
        
        .dark .ql-toolbar button:hover,
        .dark .ql-toolbar button.ql-active {
          color: rgb(251 146 60);
        }
        
        .dark .ql-toolbar button:hover .ql-stroke,
        .dark .ql-toolbar button.ql-active .ql-stroke {
          stroke: rgb(251 146 60);
        }
        
        .dark .ql-toolbar button:hover .ql-fill,
        .dark .ql-toolbar button.ql-active .ql-fill {
          fill: rgb(251 146 60);
        }
        
        .ql-editor a {
          color: rgb(249 115 22);
          text-decoration: underline;
        }
        
        .ql-editor pre {
          background: rgb(241 245 249);
          border-radius: 0.5rem;
          padding: 1rem;
        }
        
        .dark .ql-editor pre {
          background: rgb(30 41 59);
          color: rgb(226 232 240);
        }
        
        .ql-editor blockquote {
          border-left: 4px solid rgb(249 115 22);
          padding-left: 1rem;
          margin-left: 0;
          font-style: italic;
        }
        
        .ql-editor img {
          max-width: 100%;
          height: auto;
          border-radius: 0.5rem;
          margin: 1rem 0;
        }
        
        .ql-editor h1,
        .ql-editor h2,
        .ql-editor h3,
        .ql-editor h4,
        .ql-editor h5,
        .ql-editor h6 {
          font-weight: 700;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
        }
        
        .ql-editor h1 { font-size: 2rem; }
        .ql-editor h2 { font-size: 1.75rem; }
        .ql-editor h3 { font-size: 1.5rem; }
        .ql-editor h4 { font-size: 1.25rem; }
        .ql-editor h5 { font-size: 1.125rem; }
        .ql-editor h6 { font-size: 1rem; }
        
        .ql-editor ul,
        .ql-editor ol {
          padding-left: 1.5rem;
          margin: 1rem 0;
        }
        
        .ql-editor li {
          margin: 0.5rem 0;
        }
      `}</style>
    </div>
  );
}

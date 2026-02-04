'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';
import Link from '@tiptap/extension-link';
import Underline from '@tiptap/extension-underline';
import { TextStyle } from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import { useCallback } from 'react';

export default function TiptapEditor({ value, onChange, placeholder }) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4, 5, 6],
        },
      }),
      Image.configure({
        inline: false,
        allowBase64: true,
        HTMLAttributes: {
          style: 'display: block; margin-left: auto; margin-right: auto; max-width: 100%; border-radius: 0.5rem;',
        },
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph', 'image'],
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-orange-600 underline',
        },
      }),
      Underline,
      TextStyle,
      Color,
    ],
    content: value || '',
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-xl focus:outline-none min-h-[300px] p-4',
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      if (onChange) {
        onChange(html);
      }
    },
  });

  const handleImageUpload = useCallback(() => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = e.target?.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        const url = event.target?.result;
        if (url && editor) {
          editor.chain().focus().setImage({ src: url }).run();
        }
      };
      reader.readAsDataURL(file);
    };
    input.click();
  }, [editor]);

  const setLink = useCallback(() => {
    const previousUrl = editor?.getAttributes('link').href;
    const url = window.prompt('URL:', previousUrl);

    if (url === null) return;

    if (url === '') {
      editor?.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    editor?.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  }, [editor]);

  if (!editor) {
    return (
      <div className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-700 min-h-[300px] flex items-center justify-center">
        <span className="text-gray-500 dark:text-gray-400">Loading editor...</span>
      </div>
    );
  }

  return (
    <div className="tiptap-editor border rounded-lg bg-white dark:bg-gray-800">
      {/* Toolbar */}
      <div className="border-b p-2 flex flex-wrap gap-1 bg-gray-50 dark:bg-gray-700">
        {/* Headings */}
        <select
          onChange={(e) => {
            const level = parseInt(e.target.value);
            if (level === 0) {
              editor.chain().focus().setParagraph().run();
            } else {
              editor.chain().focus().setHeading({ level }).run();
            }
          }}
          className="px-2 py-1 border rounded dark:bg-gray-600 dark:text-white text-sm"
          title="Heading"
        >
          <option value="0">Paragraph</option>
          <option value="1">Heading 1</option>
          <option value="2">Heading 2</option>
          <option value="3">Heading 3</option>
          <option value="4">Heading 4</option>
          <option value="5">Heading 5</option>
          <option value="6">Heading 6</option>
        </select>

        <div className="w-px bg-gray-300 dark:bg-gray-600 mx-1"></div>

        {/* Text Formatting */}
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`px-3 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600 ${
            editor.isActive('bold') ? 'bg-gray-300 dark:bg-gray-600' : ''
          }`}
          title="Bold (Ctrl+B)"
        >
          <strong>B</strong>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`px-3 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600 ${
            editor.isActive('italic') ? 'bg-gray-300 dark:bg-gray-600' : ''
          }`}
          title="Italic (Ctrl+I)"
        >
          <em>I</em>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`px-3 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600 ${
            editor.isActive('underline') ? 'bg-gray-300 dark:bg-gray-600' : ''
          }`}
          title="Underline (Ctrl+U)"
        >
          <u>U</u>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`px-3 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600 ${
            editor.isActive('strike') ? 'bg-gray-300 dark:bg-gray-600' : ''
          }`}
          title="Strikethrough"
        >
          <s>S</s>
        </button>

        <div className="w-px bg-gray-300 dark:bg-gray-600 mx-1"></div>

        {/* Lists */}
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`px-3 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600 ${
            editor.isActive('bulletList') ? 'bg-gray-300 dark:bg-gray-600' : ''
          }`}
          title="Bullet List"
        >
          • List
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`px-3 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600 ${
            editor.isActive('orderedList') ? 'bg-gray-300 dark:bg-gray-600' : ''
          }`}
          title="Numbered List"
        >
          1. List
        </button>

        <div className="w-px bg-gray-300 dark:bg-gray-600 mx-1"></div>

        {/* Alignment */}
        <button
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          className={`px-3 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600 ${
            editor.isActive({ textAlign: 'left' }) ? 'bg-gray-300 dark:bg-gray-600' : ''
          }`}
          title="Align Left"
        >
          ⬅
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          className={`px-3 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600 ${
            editor.isActive({ textAlign: 'center' }) ? 'bg-gray-300 dark:bg-gray-600' : ''
          }`}
          title="Align Center"
        >
          ⬌
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          className={`px-3 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600 ${
            editor.isActive({ textAlign: 'right' }) ? 'bg-gray-300 dark:bg-gray-600' : ''
          }`}
          title="Align Right"
        >
          ➡
        </button>

        <div className="w-px bg-gray-300 dark:bg-gray-600 mx-1"></div>

        {/* Blockquote & Code */}
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`px-3 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600 ${
            editor.isActive('blockquote') ? 'bg-gray-300 dark:bg-gray-600' : ''
          }`}
          title="Quote"
        >
          &ldquo;
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={`px-3 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600 ${
            editor.isActive('codeBlock') ? 'bg-gray-300 dark:bg-gray-600' : ''
          }`}
          title="Code Block"
        >
          {'</>'}
        </button>

        <div className="w-px bg-gray-300 dark:bg-gray-600 mx-1"></div>

        {/* Link & Image */}
        <button
          onClick={setLink}
          className={`px-3 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600 ${
            editor.isActive('link') ? 'bg-gray-300 dark:bg-gray-600' : ''
          }`}
          title="Insert Link"
        >
          🔗
        </button>
        <button
          onClick={handleImageUpload}
          className="px-3 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600"
          title="Insert Image"
        >
          🖼️
        </button>

        <div className="w-px bg-gray-300 dark:bg-gray-600 mx-1"></div>

        {/* Clear Formatting */}
        <button
          onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()}
          className="px-3 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600"
          title="Clear Formatting"
        >
          ✖
        </button>
      </div>

      {/* Editor Content */}
      <EditorContent editor={editor} className="dark:text-white" />

      <style jsx global>{`
        .tiptap-editor .ProseMirror {
          min-height: 300px;
          padding: 1rem;
        }

        .tiptap-editor .ProseMirror:focus {
          outline: none;
        }

        .tiptap-editor .ProseMirror p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          float: left;
          color: #adb5bd;
          pointer-events: none;
          height: 0;
        }

        .tiptap-editor .ProseMirror img {
          display: block;
          margin-left: auto;
          margin-right: auto;
          max-width: 100%;
          border-radius: 0.5rem;
        }

        .tiptap-editor .ProseMirror h1 {
          font-size: 2rem;
          font-weight: 700;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
        }

        .tiptap-editor .ProseMirror h2 {
          font-size: 1.75rem;
          font-weight: 700;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
        }

        .tiptap-editor .ProseMirror h3 {
          font-size: 1.5rem;
          font-weight: 700;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
        }

        .tiptap-editor .ProseMirror h4 {
          font-size: 1.25rem;
          font-weight: 700;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
        }

        .tiptap-editor .ProseMirror h5 {
          font-size: 1.125rem;
          font-weight: 700;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
        }

        .tiptap-editor .ProseMirror h6 {
          font-size: 1rem;
          font-weight: 700;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
        }

        .tiptap-editor .ProseMirror ul,
        .tiptap-editor .ProseMirror ol {
          padding-left: 1.5rem;
          margin: 1rem 0;
        }

        .tiptap-editor .ProseMirror li {
          margin: 0.5rem 0;
        }

        .tiptap-editor .ProseMirror blockquote {
          border-left: 4px solid rgb(249 115 22);
          padding-left: 1rem;
          margin-left: 0;
          font-style: italic;
          color: #6b7280;
        }

        .dark .tiptap-editor .ProseMirror blockquote {
          color: #9ca3af;
        }

        .tiptap-editor .ProseMirror pre {
          background: rgb(241 245 249);
          border-radius: 0.5rem;
          padding: 1rem;
          overflow-x: auto;
        }

        .dark .tiptap-editor .ProseMirror pre {
          background: rgb(30 41 59);
          color: rgb(226 232 240);
        }

        .tiptap-editor .ProseMirror code {
          background: rgb(241 245 249);
          padding: 0.125rem 0.25rem;
          border-radius: 0.25rem;
          font-family: monospace;
        }

        .dark .tiptap-editor .ProseMirror code {
          background: rgb(30 41 59);
          color: rgb(226 232 240);
        }

        .tiptap-editor .ProseMirror a {
          color: rgb(249 115 22);
          text-decoration: underline;
        }

        .tiptap-editor .ProseMirror p[style*="text-align: center"] img,
        .tiptap-editor .ProseMirror [style*="text-align: center"] img {
          display: block !important;
          margin-left: auto !important;
          margin-right: auto !important;
        }
      `}</style>
    </div>
  );
}

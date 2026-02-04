'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Node } from '@tiptap/core';
import { EditorContent, NodeViewWrapper, ReactNodeViewRenderer, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import TipTapImage from '@tiptap/extension-image';
import { TextStyle } from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import 'katex/dist/katex.min.css';
import katex from 'katex';
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Eraser,
  Heading2,
  Image as ImageIcon,
  Italic,
  Link2,
  List,
  ListOrdered,
  Sigma,
  Strikethrough,
  Underline as UnderlineIcon,
  X,
} from 'lucide-react';

const FORMULA_TEMPLATES = [
  {
    label: 'Fraction',
    latex: '\\frac{a}{b}',
    note: 'Pecahan',
  },
  {
    label: 'Power',
    latex: 'x^{2}',
    note: 'Pangkat',
  },
  {
    label: 'Subscript',
    latex: 'x_{i}',
    note: 'Subscript',
  },
  {
    label: 'Root',
    latex: '\\sqrt{x}',
    note: 'Akar',
  },
  {
    label: 'Sum',
    latex: '\\sum_{i=1}^{n} i',
    note: 'Sigma',
  },
  {
    label: 'Integral',
    latex: '\\int_{0}^{1} x \\, dx',
    note: 'Integral',
  },
  {
    label: 'Greek',
    latex: '\\alpha + \\beta = \\gamma',
    note: 'Huruf Yunani',
  },
  {
    label: 'Matrix',
    latex: '\\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix}',
    note: 'Matriks 2×2',
  },
  {
    label: 'Text',
    latex: '\\text{flow rate } q',
    note: 'Teks di dalam rumus',
  },
];

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function isEditorDebugEnabled() {
  if (typeof window === 'undefined') return false;
  return window.localStorage?.getItem('DEBUG_EDITOR') === '1' || window.localStorage?.getItem('DEBUG_TIPTAP') === '1';
}

function ResizableImageView({ node, selected, updateAttributes }) {
  const imgRef = useRef(null);
  const [dragging, setDragging] = useState(false);

  const widthAttr = node?.attrs?.width || null;
  const alignAttr = node?.attrs?.align || 'center';

  const marginStyle =
    alignAttr === 'left'
      ? '0 auto 0 0'
      : alignAttr === 'right'
        ? '0 0 0 auto'
        : '0 auto';

  const startResize = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const imgEl = imgRef.current;
    if (!imgEl) return;

    const startX = event.clientX;
    const startWidth = imgEl.getBoundingClientRect().width;
    setDragging(true);

    const handleMove = (moveEvent) => {
      const dx = moveEvent.clientX - startX;
      const next = clamp(startWidth + dx, 80, 1200);
      updateAttributes({ width: `${Math.round(next)}px` });
    };

    const handleUp = () => {
      setDragging(false);
      window.removeEventListener('pointermove', handleMove);
      window.removeEventListener('pointerup', handleUp);
    };

    window.addEventListener('pointermove', handleMove);
    window.addEventListener('pointerup', handleUp);
  };

  useEffect(() => {
    if (!isEditorDebugEnabled()) return;
    const src = node?.attrs?.src;
    const preview = typeof src === 'string' ? `${src.slice(0, 48)}${src.length > 48 ? '…' : ''}` : src;
    console.log('[TipTap][ImageView]', {
      selected,
      src: preview,
      width: node?.attrs?.width || null,
      align: node?.attrs?.align || null,
    });
  }, [node?.attrs?.src, node?.attrs?.width, node?.attrs?.align, selected]);

  return (
    <NodeViewWrapper className="tiptap-image-node" data-dragging={dragging ? 'true' : 'false'}>
      <div className="tiptap-image-wrap">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={imgRef}
          src={node.attrs.src}
          alt={node.attrs.alt || ''}
          style={{
            width: widthAttr || 'auto',
            maxWidth: '100%',
            height: 'auto',
            display: 'block',
            margin: marginStyle,
          }}
          draggable={false}
        />

        {selected && (
          <>
            <div className="tiptap-image-toolbar">
              <button type="button" onClick={() => updateAttributes({ align: 'left' })} className={alignAttr === 'left' ? 'active' : ''}>
                Left
              </button>
              <button type="button" onClick={() => updateAttributes({ align: 'center' })} className={alignAttr === 'center' ? 'active' : ''}>
                Center
              </button>
              <button type="button" onClick={() => updateAttributes({ align: 'right' })} className={alignAttr === 'right' ? 'active' : ''}>
                Right
              </button>
            </div>
            <div className="tiptap-image-handle" onPointerDown={startResize} />
          </>
        )}
      </div>
    </NodeViewWrapper>
  );
}

const ResizableImage = TipTapImage.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      width: {
        default: null,
        parseHTML: (element) => element.getAttribute('data-width') || element.style.width || null,
        renderHTML: (attrs) => {
          if (!attrs.width) return {};
          return { 'data-width': attrs.width, style: `width:${attrs.width};max-width:100%;height:auto;` };
        },
      },
      align: {
        default: 'center',
        parseHTML: (element) => element.getAttribute('data-align') || 'center',
        renderHTML: (attrs) => ({ 'data-align': attrs.align || 'center' }),
      },
    };
  },
  addNodeView() {
    return ReactNodeViewRenderer(ResizableImageView);
  },
});

function KatexView({ node, selected }) {
  const latex = node?.attrs?.latex || '';
  const html = useMemo(() => {
    try {
      return katex.renderToString(latex, { throwOnError: false });
    } catch {
      return latex;
    }
  }, [latex]);

  return (
    <NodeViewWrapper className={selected ? 'tiptap-katex selected' : 'tiptap-katex'}>
      <span data-latex={latex} dangerouslySetInnerHTML={{ __html: html }} />
    </NodeViewWrapper>
  );
}

const KatexInline = Node.create({
  name: 'katexInline',
  group: 'inline',
  inline: true,
  atom: true,
  selectable: true,
  addAttributes() {
    return {
      latex: {
        default: '',
        parseHTML: (element) => element.getAttribute('data-latex') || '',
        renderHTML: (attrs) => ({ 'data-latex': attrs.latex || '' }),
      },
    };
  },
  parseHTML() {
    return [{ tag: 'span[data-latex]' }];
  },
  renderHTML({ HTMLAttributes }) {
    return ['span', HTMLAttributes];
  },
  addNodeView() {
    return ReactNodeViewRenderer(KatexView);
  },
});

function ToolbarButton({ active, disabled, onClick, children, title }) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      disabled={disabled}
      className={
        'tiptap-btn ' +
        (active ? 'tiptap-btn-active ' : '') +
        (disabled ? 'tiptap-btn-disabled' : '')
      }
    >
      {children}
    </button>
  );
}

export default function RichTextEditorClient({ value, onChange, placeholder }) {
  const lastHtmlRef = useRef(value || '');
  const debugEnabled = isEditorDebugEnabled();

  const [formulaOpen, setFormulaOpen] = useState(false);
  const [formulaLatex, setFormulaLatex] = useState('');
  const [formulaDisplayMode, setFormulaDisplayMode] = useState(false);
  const formulaInputRef = useRef(null);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Underline,
      TextStyle,
      Color,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          rel: 'noopener noreferrer',
          target: '_blank',
        },
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      ResizableImage.configure({
        inline: false,
        allowBase64: true,
      }),
      KatexInline,
    ],
    content: value || '',
    editorProps: {
      attributes: {
        class:
          'tiptap-editor prose prose-lg dark:prose-invert max-w-none focus:outline-none min-h-[300px] p-4',
        'data-placeholder': placeholder || 'Write your content here...',
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      lastHtmlRef.current = html;
      onChange?.(html);
    },
  });

  useEffect(() => {
    if (!editor) return;
    const next = value || '';
    if (next !== lastHtmlRef.current) {
      editor.commands.setContent(next, false);
      lastHtmlRef.current = next;
    }
  }, [editor, value]);

  useEffect(() => {
    if (!formulaOpen) return;
    const id = window.requestAnimationFrame(() => {
      formulaInputRef.current?.focus?.();
    });
    return () => window.cancelAnimationFrame(id);
  }, [formulaOpen]);

  const insertImage = useCallback(() => {
    if (!editor) return;

    if (debugEnabled) console.log('[TipTap][Image] open file picker');

    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.style.display = 'none';
    document.body.appendChild(input);

    const cleanup = () => {
      try {
        if (input && input.isConnected) input.remove();
      } catch {
        // ignore
      }
    };

    input.addEventListener(
      'change',
      () => {
        const file = input.files?.[0];
        if (!file) {
          if (debugEnabled) console.log('[TipTap] image picker canceled');
          cleanup();
          return;
        }

        if (debugEnabled) {
          console.log('[TipTap] image selected', {
            name: file.name,
            type: file.type,
            size: file.size,
          });
        }

        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const src = e.target?.result;
            if (!src) return;

            if (debugEnabled) {
              const srcStr = String(src);
              console.log('[TipTap][Image] src prefix', srcStr.slice(0, 64));
              console.log('[TipTap][Image] data url length', srcStr.length);
            }

            const srcStr = String(src);
            const canSet = editor.can().chain().focus().setImage({ src: srcStr, alt: file.name, align: 'center' }).run();
            if (debugEnabled) console.log('[TipTap][Image] canSetImage', canSet);

            const ok = editor.chain().focus().setImage({ src: srcStr, alt: file.name, align: 'center' }).run();
            if (!ok) {
              if (debugEnabled) console.warn('[TipTap][Image] setImage failed; trying insertContent fallback');
              editor.chain().focus().insertContent({ type: 'image', attrs: { src: srcStr, alt: file.name, align: 'center' } }).run();
            }

            if (debugEnabled) {
              const html = editor.getHTML();
              console.log('[TipTap][Image] setImage run()', ok);
              console.log('[TipTap][Image] HTML contains <img> ?', html.includes('<img'));
              console.log('[TipTap][Image] HTML after insert (first 300 chars):', html.slice(0, 300));
            }
          } finally {
            cleanup();
          }
        };

        reader.onerror = (err) => {
          if (debugEnabled) console.error('[TipTap] FileReader error', err);
          cleanup();
        };
        reader.onabort = () => {
          if (debugEnabled) console.log('[TipTap] FileReader aborted');
          cleanup();
        };
        reader.readAsDataURL(file);
      },
      { once: true }
    );

    input.click();
  }, [debugEnabled, editor]);

  const openFormulaModal = useCallback(() => {
    if (!editor) return;
    setFormulaLatex('');
    setFormulaDisplayMode(false);
    setFormulaOpen(true);
  }, [editor]);

  const insertFormulaFromModal = useCallback(() => {
    if (!editor) return;
    const latex = (formulaLatex || '').trim();
    if (!latex) return;
    if (formulaDisplayMode) {
      editor
        .chain()
        .focus()
        .insertContent({
          type: 'paragraph',
          attrs: { textAlign: 'center' },
          content: [{ type: 'katexInline', attrs: { latex } }],
        })
        .insertContent({ type: 'paragraph' })
        .run();
    } else {
      editor.chain().focus().insertContent({ type: 'katexInline', attrs: { latex } }).run();
    }
    setFormulaOpen(false);
  }, [editor, formulaDisplayMode, formulaLatex]);

  const formulaPreviewHtml = useMemo(() => {
    const latex = (formulaLatex || '').trim();
    if (!latex) return '<span class="tiptap-formula-preview-empty">Preview akan muncul di sini…</span>';
    try {
      return katex.renderToString(latex, {
        throwOnError: false,
        displayMode: Boolean(formulaDisplayMode),
      });
    } catch {
      return '<span class="tiptap-formula-preview-empty">Rumus tidak valid (preview gagal dirender).</span>';
    }
  }, [formulaLatex, formulaDisplayMode]);

  const setLink = useCallback(() => {
    if (!editor) return;
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('Masukkan URL:', previousUrl || '');
    if (url === null) return;
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  }, [editor]);

  if (!editor) {
    return (
      <div className="w-full h-64 bg-gray-100 dark:bg-gray-700 rounded-lg animate-pulse flex items-center justify-center">
        <p className="text-gray-500 dark:text-gray-400">Loading editor...</p>
      </div>
    );
  }

  return (
    <div className="rich-text-editor">
      <div className="tiptap-toolbar">
        <div className="tiptap-group" aria-label="Formatting">
          <ToolbarButton title="Bold" active={editor.isActive('bold')} onClick={() => editor.chain().focus().toggleBold().run()}>
            <Bold size={16} />
          </ToolbarButton>
          <ToolbarButton title="Italic" active={editor.isActive('italic')} onClick={() => editor.chain().focus().toggleItalic().run()}>
            <Italic size={16} />
          </ToolbarButton>
          <ToolbarButton title="Underline" active={editor.isActive('underline')} onClick={() => editor.chain().focus().toggleUnderline().run()}>
            <UnderlineIcon size={16} />
          </ToolbarButton>
          <ToolbarButton title="Strike" active={editor.isActive('strike')} onClick={() => editor.chain().focus().toggleStrike().run()}>
            <Strikethrough size={16} />
          </ToolbarButton>
        </div>

        <div className="tiptap-group" aria-label="Blocks">
          <ToolbarButton title="Heading 2" active={editor.isActive('heading', { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
            <Heading2 size={16} />
          </ToolbarButton>
          <ToolbarButton title="Bullet List" active={editor.isActive('bulletList')} onClick={() => editor.chain().focus().toggleBulletList().run()}>
            <List size={16} />
          </ToolbarButton>
          <ToolbarButton title="Numbered List" active={editor.isActive('orderedList')} onClick={() => editor.chain().focus().toggleOrderedList().run()}>
            <ListOrdered size={16} />
          </ToolbarButton>
        </div>

        <div className="tiptap-group" aria-label="Alignment">
          <ToolbarButton title="Align Left" active={editor.isActive({ textAlign: 'left' })} onClick={() => editor.chain().focus().setTextAlign('left').run()}>
            <AlignLeft size={16} />
          </ToolbarButton>
          <ToolbarButton title="Align Center" active={editor.isActive({ textAlign: 'center' })} onClick={() => editor.chain().focus().setTextAlign('center').run()}>
            <AlignCenter size={16} />
          </ToolbarButton>
          <ToolbarButton title="Align Right" active={editor.isActive({ textAlign: 'right' })} onClick={() => editor.chain().focus().setTextAlign('right').run()}>
            <AlignRight size={16} />
          </ToolbarButton>
        </div>

        <div className="tiptap-group" aria-label="Insert">
          <ToolbarButton title="Link" active={editor.isActive('link')} onClick={setLink}>
            <Link2 size={16} />
          </ToolbarButton>
          <ToolbarButton title="Insert Image" onClick={insertImage}>
            <ImageIcon size={16} />
          </ToolbarButton>
          <ToolbarButton title="Insert Formula (KaTeX)" onClick={openFormulaModal}>
            <Sigma size={16} />
          </ToolbarButton>
        </div>

        <div className="tiptap-group" aria-label="Cleanup">
          <ToolbarButton title="Clear Formatting" onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()}>
            <Eraser size={16} />
          </ToolbarButton>
        </div>
      </div>

      <div className="tiptap-surface bg-white dark:bg-primary-700 rounded-lg border border-gray-200 dark:border-gray-700">
        <EditorContent editor={editor} />
      </div>

      {formulaOpen && (
        <div
          className="tiptap-modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Insert Formula"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setFormulaOpen(false);
          }}
        >
          <div className="tiptap-modal" onMouseDown={(e) => e.stopPropagation()}>
            <div className="tiptap-modal-header">
              <div>
                <div className="tiptap-modal-title">Insert Formula</div>
                <div className="tiptap-modal-subtitle">Gunakan KaTeX/LaTeX. Tips: `Ctrl+Enter` untuk insert, `Esc` untuk tutup.</div>
              </div>
              <button type="button" className="tiptap-modal-close" onClick={() => setFormulaOpen(false)} title="Close">
                <X size={18} />
              </button>
            </div>

            <div className="tiptap-modal-body">
              <div className="tiptap-modal-col">
                <label className="tiptap-field-label">LaTeX</label>
                <textarea
                  ref={formulaInputRef}
                  className="tiptap-textarea"
                  placeholder="Contoh: \\frac{a}{b}"
                  value={formulaLatex}
                  onChange={(e) => setFormulaLatex(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Escape') {
                      e.preventDefault();
                      setFormulaOpen(false);
                      return;
                    }
                    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
                      e.preventDefault();
                      insertFormulaFromModal();
                    }
                  }}
                  rows={4}
                />

                <label className="tiptap-checkbox">
                  <input type="checkbox" checked={formulaDisplayMode} onChange={(e) => setFormulaDisplayMode(e.target.checked)} />
                  <span>Display mode (insert sebagai blok center)</span>
                </label>

                <div className="tiptap-section">
                  <div className="tiptap-section-title">Templates cepat</div>
                  <div className="tiptap-chips">
                    {FORMULA_TEMPLATES.map((t) => (
                      <button
                        key={t.label}
                        type="button"
                        className="tiptap-chip"
                        onClick={() => setFormulaLatex(t.latex)}
                        title={t.note}
                      >
                        <span className="tiptap-chip-label">{t.label}</span>
                        <span className="tiptap-chip-note">{t.note}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="tiptap-section">
                  <div className="tiptap-section-title">Dokumentasi singkat (contoh)</div>
                  <ul className="tiptap-docs">
                    <li>
                      Pecahan: <code>{'\\frac{a}{b}'}</code>
                    </li>
                    <li>
                      Akar: <code>{'\\sqrt{x}'}</code> atau <code>{'\\sqrt[3]{x}'}</code>
                    </li>
                    <li>
                      Pangkat/Subscript: <code>{'x^{2}'}</code>, <code>{'x_{i}'}</code>
                    </li>
                    <li>
                      Integral: <code>{'\\int_{0}^{1} x \\, dx'}</code>
                    </li>
                    <li>
                      Sigma: <code>{'\\sum_{i=1}^{n} i'}</code>
                    </li>
                    <li>
                      Matriks: <code>{'\\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix}'}</code>
                    </li>
                    <li>
                      Teks: <code>{'\\text{flow rate} \\; q'}</code>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="tiptap-modal-col">
                <div className="tiptap-section-title">Preview</div>
                <div className={formulaDisplayMode ? 'tiptap-formula-preview display' : 'tiptap-formula-preview'}>
                  <div dangerouslySetInnerHTML={{ __html: formulaPreviewHtml }} />
                </div>

                <div className="tiptap-modal-actions">
                  <button type="button" className="tiptap-action secondary" onClick={() => setFormulaOpen(false)}>
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="tiptap-action primary"
                    onClick={insertFormulaFromModal}
                    disabled={!formulaLatex.trim()}
                    title={!formulaLatex.trim() ? 'Masukkan LaTeX terlebih dahulu' : 'Insert formula'}
                  >
                    Insert
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        .tiptap-toolbar {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          padding: 10px;
          border: 1px solid rgb(229 231 235);
          border-bottom: none;
          border-radius: 10px 10px 0 0;
          background: linear-gradient(180deg, rgba(255,255,255,0.95), rgba(255,255,255,0.86));
          backdrop-filter: blur(8px);
        }

        .dark .tiptap-toolbar {
          background: linear-gradient(180deg, rgba(51,65,85,0.95), rgba(51,65,85,0.82));
          border-color: rgb(71 85 105);
        }

        .tiptap-group {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px;
          border: 1px solid rgb(229 231 235);
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.9);
        }

        .dark .tiptap-group {
          border-color: rgb(71 85 105);
          background: rgba(30, 41, 59, 0.55);
        }

        .tiptap-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 10px;
          border: 1px solid rgb(209 213 219);
          background: rgba(255, 255, 255, 0.95);
          color: rgb(17 24 39);
          transition: transform 120ms ease, border-color 120ms ease, box-shadow 120ms ease, background 120ms ease;
        }

        .dark .tiptap-btn {
          background: rgba(30, 41, 59, 0.9);
          border-color: rgb(71 85 105);
          color: rgb(226 232 240);
        }

        .tiptap-btn:hover {
          border-color: rgb(59 130 246);
          box-shadow: 0 6px 18px rgba(2, 6, 23, 0.08);
          transform: translateY(-1px);
        }

        .tiptap-btn-active {
          border-color: rgb(251 146 60);
          box-shadow: 0 0 0 1px rgb(251 146 60), 0 8px 20px rgba(251, 146, 60, 0.18);
        }

        .tiptap-btn-disabled {
          opacity: 0.5;
        }

        .tiptap-btn svg {
          width: 16px;
          height: 16px;
        }

        .tiptap-surface {
          border-radius: 0 0 8px 8px;
        }

        .tiptap-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(2, 6, 23, 0.55);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px;
          z-index: 60;
        }

        .tiptap-modal {
          width: min(980px, 100%);
          max-height: min(86vh, 860px);
          overflow: auto;
          border-radius: 14px;
          border: 1px solid rgba(148, 163, 184, 0.35);
          background: rgba(255, 255, 255, 0.96);
          backdrop-filter: blur(10px);
          box-shadow: 0 18px 60px rgba(2, 6, 23, 0.35);
        }

        .dark .tiptap-modal {
          background: rgba(15, 23, 42, 0.92);
          border-color: rgba(148, 163, 184, 0.22);
        }

        .tiptap-modal-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 12px;
          padding: 14px 16px;
          border-bottom: 1px solid rgba(148, 163, 184, 0.25);
        }

        .tiptap-modal-title {
          font-weight: 700;
          color: rgb(15 23 42);
        }

        .dark .tiptap-modal-title {
          color: rgb(226 232 240);
        }

        .tiptap-modal-subtitle {
          margin-top: 2px;
          font-size: 12px;
          color: rgb(71 85 105);
        }

        .dark .tiptap-modal-subtitle {
          color: rgb(148 163 184);
        }

        .tiptap-modal-close {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          border: 1px solid rgba(148, 163, 184, 0.35);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: rgb(30 41 59);
          background: rgba(255, 255, 255, 0.75);
        }

        .dark .tiptap-modal-close {
          color: rgb(226 232 240);
          background: rgba(30, 41, 59, 0.5);
          border-color: rgba(148, 163, 184, 0.22);
        }

        .tiptap-modal-body {
          display: grid;
          grid-template-columns: 1.2fr 0.9fr;
          gap: 16px;
          padding: 16px;
        }

        @media (max-width: 860px) {
          .tiptap-modal-body {
            grid-template-columns: 1fr;
          }
        }

        .tiptap-modal-col {
          min-width: 0;
        }

        .tiptap-field-label {
          display: block;
          font-size: 12px;
          font-weight: 600;
          color: rgb(51 65 85);
          margin-bottom: 6px;
        }

        .dark .tiptap-field-label {
          color: rgb(203 213 225);
        }

        .tiptap-textarea {
          width: 100%;
          border-radius: 12px;
          border: 1px solid rgba(148, 163, 184, 0.45);
          padding: 10px 12px;
          background: rgba(255, 255, 255, 0.9);
          color: rgb(15 23 42);
          outline: none;
          resize: vertical;
        }

        .dark .tiptap-textarea {
          background: rgba(30, 41, 59, 0.55);
          color: rgb(226 232 240);
          border-color: rgba(148, 163, 184, 0.22);
        }

        .tiptap-textarea:focus {
          border-color: rgb(59 130 246);
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.18);
        }

        .tiptap-checkbox {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          margin-top: 10px;
          user-select: none;
          font-size: 13px;
          color: rgb(51 65 85);
        }

        .dark .tiptap-checkbox {
          color: rgb(203 213 225);
        }

        .tiptap-section {
          margin-top: 14px;
        }

        .tiptap-section-title {
          font-size: 12px;
          font-weight: 700;
          color: rgb(30 41 59);
          margin-bottom: 8px;
        }

        .dark .tiptap-section-title {
          color: rgb(226 232 240);
        }

        .tiptap-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .tiptap-chip {
          display: inline-flex;
          flex-direction: column;
          gap: 2px;
          padding: 8px 10px;
          border-radius: 12px;
          border: 1px solid rgba(148, 163, 184, 0.35);
          background: rgba(255, 255, 255, 0.85);
          text-align: left;
          min-width: 120px;
        }

        .dark .tiptap-chip {
          background: rgba(30, 41, 59, 0.55);
          border-color: rgba(148, 163, 184, 0.22);
        }

        .tiptap-chip:hover {
          border-color: rgba(59, 130, 246, 0.7);
          box-shadow: 0 10px 24px rgba(2, 6, 23, 0.12);
        }

        .tiptap-chip-label {
          font-weight: 700;
          font-size: 12px;
          color: rgb(15 23 42);
        }

        .dark .tiptap-chip-label {
          color: rgb(226 232 240);
        }

        .tiptap-chip-note {
          font-size: 11px;
          color: rgb(100 116 139);
        }

        .dark .tiptap-chip-note {
          color: rgb(148 163 184);
        }

        .tiptap-docs {
          margin: 0;
          padding-left: 18px;
          color: rgb(51 65 85);
          font-size: 13px;
        }

        .dark .tiptap-docs {
          color: rgb(203 213 225);
        }

        .tiptap-docs code {
          padding: 2px 6px;
          border-radius: 8px;
          background: rgba(148, 163, 184, 0.2);
          font-size: 12px;
        }

        .dark .tiptap-docs code {
          background: rgba(148, 163, 184, 0.14);
        }

        .tiptap-formula-preview {
          border-radius: 14px;
          border: 1px solid rgba(148, 163, 184, 0.35);
          background: rgba(255, 255, 255, 0.88);
          padding: 14px;
          min-height: 140px;
          overflow: auto;
        }

        .dark .tiptap-formula-preview {
          background: rgba(30, 41, 59, 0.55);
          border-color: rgba(148, 163, 184, 0.22);
        }

        .tiptap-formula-preview.display {
          text-align: center;
        }

        .tiptap-formula-preview-empty {
          color: rgb(100 116 139);
          font-size: 13px;
        }

        .tiptap-modal-actions {
          display: flex;
          justify-content: flex-end;
          gap: 10px;
          margin-top: 14px;
        }

        .tiptap-action {
          height: 40px;
          padding: 0 14px;
          border-radius: 12px;
          border: 1px solid rgba(148, 163, 184, 0.35);
          font-weight: 700;
        }

        .tiptap-action.primary {
          background: rgb(59 130 246);
          border-color: rgb(59 130 246);
          color: #fff;
        }

        .tiptap-action.primary:disabled {
          opacity: 0.6;
        }

        .tiptap-action.secondary {
          background: rgba(255, 255, 255, 0.75);
          color: rgb(15 23 42);
        }

        .dark .tiptap-action.secondary {
          background: rgba(30, 41, 59, 0.55);
          color: rgb(226 232 240);
          border-color: rgba(148, 163, 184, 0.22);
        }

        .tiptap-editor {
          min-height: 300px;
        }

        .tiptap-editor:empty:before {
          content: attr(data-placeholder);
          float: left;
          color: rgb(156 163 175);
          pointer-events: none;
          height: 0;
        }

        .tiptap-image-node {
          margin: 1rem 0;
        }

        .tiptap-image-wrap {
          position: relative;
        }

        .tiptap-image-handle {
          position: absolute;
          width: 14px;
          height: 14px;
          right: -6px;
          bottom: -6px;
          background: rgb(251 146 60);
          border-radius: 3px;
          border: 2px solid #fff;
          cursor: se-resize;
        }

        .dark .tiptap-image-handle {
          border-color: rgb(30 41 59);
        }

        .tiptap-image-toolbar {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          top: -38px;
          display: flex;
          gap: 6px;
          background: rgba(15, 23, 42, 0.85);
          color: #fff;
          padding: 6px;
          border-radius: 8px;
          font-size: 12px;
        }

        .tiptap-image-toolbar button {
          padding: 4px 6px;
          border-radius: 6px;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .tiptap-image-toolbar button.active {
          border-color: rgb(251 146 60);
        }

        .tiptap-katex {
          display: inline-block;
          padding: 2px 4px;
          border-radius: 4px;
        }

        .tiptap-katex.selected {
          outline: 2px solid rgb(251 146 60);
        }
      `}</style>
    </div>
  );
}

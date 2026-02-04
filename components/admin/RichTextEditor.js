'use client';

import dynamic from 'next/dynamic';

const RichTextEditorClient = dynamic(() => import('./RichTextEditorClient'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-64 bg-gray-100 dark:bg-gray-700 rounded-lg animate-pulse flex items-center justify-center">
      <p className="text-gray-500 dark:text-gray-400">Loading editor...</p>
    </div>
  ),
});

export default function RichTextEditor(props) {
  return <RichTextEditorClient {...props} />;
}

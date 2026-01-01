'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/components/providers/AuthContext';
import RichTextEditor from '@/components/admin/RichTextEditor';

export default function EditArticlePage() {
  const router = useRouter();
  const params = useParams();
  const { user, loading: authLoading, getAuthHeaders } = useAuth();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: '',
    tags: '',
    author: '',
    published: false,
    featuredImage: '',
  });

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/admin/login');
      return;
    }

    if (user && params.id) {
      console.log('Fetching article ID:', params.id);
      fetchArticle();
      fetchCategories();
    }
  }, [user, authLoading, params.id, router]);

  const fetchArticle = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/articles/' + params.id, {
        headers: getAuthHeaders(),
      });
      const data = await response.json();
      console.log('Article data:', data);

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch article');
      }

      setFormData({
        title: data.title || '',
        slug: data.slug || '',
        excerpt: data.excerpt || '',
        content: data.content || '',
        category: data.category || '',
        tags: data.tags ? data.tags.join(', ') : '',
        author: data.author || '',
        published: data.published || false,
        featuredImage: data.featuredImage || '',
      });
    } catch (err) {
      console.error('Error:', err);
      alert('Failed to load article: ' + err.message);
      router.push('/admin/articles');
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories');
      const data = await response.json();
      if (response.ok) {
        setCategories(data.categories || []);
      }
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleContentChange = (value) => {
    console.log('Content changed, new value length:', value?.length);
    setFormData(prev => ({ ...prev, content: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log('Submitting form data:', {
      titleLength: formData.title?.length,
      contentLength: formData.content?.length,
      hasContent: !!formData.content
    });
    
    if (!formData.title || !formData.slug || !formData.content) {
      alert('Please fill in required fields');
      return;
    }

    try {
      setSaving(true);
      const payload = {
        ...formData,
        tags: formData.tags ? formData.tags.split(',').map(t => t.trim()).filter(Boolean) : [],
      };
      
      console.log('Payload being sent:', {
        ...payload,
        content: payload.content?.substring(0, 100) + '...'
      });

      const response = await fetch('/api/admin/articles/' + params.id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders(),
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      
      console.log('Server response:', data);
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to update article');
      }

      alert('Article updated!');
      router.push('/admin/articles');
    } catch (err) {
      console.error('Error:', err);
      alert('Failed: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  if (authLoading || loading || !user) {
    return <div className="flex items-center justify-center min-h-screen"><div className="text-lg">Loading...</div></div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Edit Article</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Title *</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Slug *</label>
            <input type="text" name="slug" value={formData.slug} onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Excerpt</label>
            <textarea name="excerpt" value={formData.excerpt} onChange={handleChange} rows="3" className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Content *</label>
            <RichTextEditor
              value={formData.content}
              onChange={handleContentChange}
              placeholder="Write your article content here..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Category</label>
            <select name="category" value={formData.category} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white">
              <option value="">Select category</option>
              {categories.map(cat => <option key={cat.id || cat._id} value={cat.slug}>{cat.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Tags</label>
            <input type="text" name="tags" value={formData.tags} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white" placeholder="tag1, tag2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Author</label>
            <input type="text" name="author" value={formData.author} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Featured Image URL</label>
            <input type="url" name="featuredImage" value={formData.featuredImage} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white" />
          </div>
          <div className="flex items-center">
            <input type="checkbox" name="published" checked={formData.published} onChange={handleChange} className="w-4 h-4" />
            <label className="ml-2">Published</label>
          </div>
        </div>
        <div className="flex gap-4 justify-end">
          <button type="button" onClick={() => router.push('/admin/articles')} className="px-6 py-2 border rounded-lg">Cancel</button>
          <button type="submit" disabled={saving} className="px-6 py-2 bg-blue-600 text-white rounded-lg">{saving ? 'Saving...' : 'Save'}</button>
        </div>
      </form>
    </div>
  );
}

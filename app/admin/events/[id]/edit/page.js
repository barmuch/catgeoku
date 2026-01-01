'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/components/providers/AuthContext';
import RichTextEditor from '@/components/admin/RichTextEditor';

export default function EditEventPage() {
  const router = useRouter();
  const params = useParams();
  const { user, loading: authLoading, getAuthHeaders } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    date: '',
    endDate: '',
    location: '',
    featuredImage: '',
    tags: '',
    author: '',
    published: false,
  });

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/admin/login');
      return;
    }

    if (user && params.id) {
      fetchEvent();
    }
  }, [user, authLoading, params.id, router]);

  const fetchEvent = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/events/' + params.id, {
        headers: getAuthHeaders(),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch event');
      }

      // Format date for datetime-local input
      const eventDate = data.date ? new Date(data.date).toISOString().slice(0, 16) : '';
      const eventEndDate = data.endDate ? new Date(data.endDate).toISOString().slice(0, 16) : '';

      setFormData({
        title: data.title || '',
        slug: data.slug || '',
        content: data.content || '',
        date: eventDate,
        endDate: eventEndDate,
        location: data.location || '',
        featuredImage: data.featuredImage || data.image || '',
        tags: data.tags ? data.tags.join(', ') : '',
        author: data.author || '',
        published: data.published || false,
      });
    } catch (err) {
      console.error('Error:', err);
      alert('Failed to load event: ' + err.message);
      router.push('/admin/events');
    } finally {
      setLoading(false);
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
    
    if (!formData.title || !formData.slug || !formData.content || !formData.date) {
      alert('Please fill in required fields (Title, Slug, Content, Date)');
      return;
    }

    try {
      setSaving(true);

      const payload = {
        ...formData,
        tags: formData.tags ? formData.tags.split(',').map(tag => tag.trim()).filter(Boolean) : [],
      };
      
      console.log('Payload being sent:', {
        ...payload,
        content: payload.content?.substring(0, 100) + '...'
      });

      const response = await fetch('/api/admin/events/' + params.id, {
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
        throw new Error(data.error || 'Failed to update event');
      }

      alert('Event updated successfully!');
      router.push('/admin/events');
    } catch (err) {
      console.error('Error:', err);
      alert('Failed to update event: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  if (authLoading || loading || !user) {
    return <div className="flex items-center justify-center min-h-screen"><div className="text-lg">Loading...</div></div>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-primary-900 dark:text-white">Edit Event</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white dark:bg-primary-800 rounded-lg shadow-md p-6 space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-2 text-primary-900 dark:text-white">
              Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg dark:bg-primary-700 dark:text-white dark:border-primary-600 focus:ring-2 focus:ring-accent-500"
            />
          </div>

          {/* Slug */}
          <div>
            <label className="block text-sm font-medium mb-2 text-primary-900 dark:text-white">
              Slug *
            </label>
            <input
              type="text"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg dark:bg-primary-700 dark:text-white dark:border-primary-600 focus:ring-2 focus:ring-accent-500"
            />
          </div>


          {/* Content with Rich Text Editor */}
          <div>
            <label className="block text-sm font-medium mb-2 text-primary-900 dark:text-white">
              Content *
            </label>
            <RichTextEditor
              value={formData.content}
              onChange={handleContentChange}
            />
          </div>

          {/* Date and End Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-primary-900 dark:text-white">
                Start Date & Time *
              </label>
              <input
                type="datetime-local"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg dark:bg-primary-700 dark:text-white dark:border-primary-600 focus:ring-2 focus:ring-accent-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-primary-900 dark:text-white">
                End Date & Time
              </label>
              <input
                type="datetime-local"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg dark:bg-primary-700 dark:text-white dark:border-primary-600 focus:ring-2 focus:ring-accent-500"
              />
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium mb-2 text-primary-900 dark:text-white">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg dark:bg-primary-700 dark:text-white dark:border-primary-600 focus:ring-2 focus:ring-accent-500"
              placeholder="Event location or venue"
            />
          </div>

          {/* Featured Image */}
          <div>
            <label className="block text-sm font-medium mb-2 text-primary-900 dark:text-white">
              Featured Image URL
            </label>
            <input
              type="url"
              name="featuredImage"
              value={formData.featuredImage}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg dark:bg-primary-700 dark:text-white dark:border-primary-600 focus:ring-2 focus:ring-accent-500"
              placeholder="https://example.com/image.jpg"
            />
            {formData.featuredImage && (
              <img 
                src={formData.featuredImage} 
                alt="Preview" 
                className="mt-2 w-full max-w-md rounded-lg"
                onError={(e) => e.target.style.display = 'none'}
              />
            )}
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium mb-2 text-primary-900 dark:text-white">
              Tags
            </label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg dark:bg-primary-700 dark:text-white dark:border-primary-600 focus:ring-2 focus:ring-accent-500"
              placeholder="workshop, conference, networking (comma separated)"
            />
            <p className="mt-1 text-sm text-primary-500 dark:text-primary-400">
              Separate tags with commas
            </p>
          </div>

          {/* Author */}
          <div>
            <label className="block text-sm font-medium mb-2 text-primary-900 dark:text-white">
              Author
            </label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg dark:bg-primary-700 dark:text-white dark:border-primary-600 focus:ring-2 focus:ring-accent-500"
              placeholder="Author name"
            />
          </div>

          {/* Published */}
          <div className="flex items-center">
            <input
              type="checkbox"
              name="published"
              checked={formData.published}
              onChange={handleChange}
              className="w-4 h-4 text-accent-600 focus:ring-accent-500"
            />
            <label className="ml-2 text-primary-900 dark:text-white">
              Published
            </label>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-end">
          <button
            type="button"
            onClick={() => router.push('/admin/events')}
            className="px-6 py-2 border border-primary-300 dark:border-primary-600 text-primary-900 dark:text-white rounded-lg hover:bg-primary-50 dark:hover:bg-primary-700 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2 bg-accent-600 text-white rounded-lg hover:bg-accent-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { useParams, notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, MapPin, User, Tag } from 'lucide-react';
import ArticleContent from '@/components/common/ArticleContent';

export default function EventDetailPage() {
  const params = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEvent();
  }, [params.slug]);

  const fetchEvent = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/events/${params.slug}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Event not found');
      }

      setEvent(data);
    } catch (err) {
      console.error('Error fetching event:', err);
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
          <p className="text-primary-600 dark:text-primary-400">Loading event...</p>
        </div>
      </div>
    );
  }

  if (error || !event) {
    notFound();
  }

  const formatEventDate = (date, endDate) => {
    const start = new Date(date);
    const options = { month: 'long', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' };
    
    if (endDate) {
      const end = new Date(endDate);
      const isSameDay = start.toDateString() === end.toDateString();
      
      if (isSameDay) {
        return `${start.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} • ${start.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })} - ${end.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;
      } else {
        return `${start.toLocaleDateString('en-US', options)} - ${end.toLocaleDateString('en-US', options)}`;
      }
    }
    
    return start.toLocaleDateString('en-US', options);
  };

  return (
    <article className="min-h-screen bg-white dark:bg-primary-900 pt-20">
      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[400px] max-h-[600px] overflow-hidden bg-gradient-to-br from-accent-900 to-accent-800">
        {event.featuredImage && (
          <Image
            src={event.featuredImage}
            alt={event.title}
            fill
            priority
            className="object-cover opacity-40"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-primary-900 via-transparent to-transparent" />
        
        <div className="relative h-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-12">
          <div className="inline-flex items-center space-x-2 text-accent-300 mb-4 font-semibold">
            <Calendar className="w-5 h-5" />
            <span>Event</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6 leading-tight">
            {event.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-6 text-primary-200">
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5" />
              <span>{formatEventDate(event.date, event.endDate)}</span>
            </div>
            
            {event.location && (
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5" />
                <span>{event.location}</span>
              </div>
            )}
            
            {event.author && (
              <div className="flex items-center space-x-2">
                <User className="w-5 h-5" />
                <span>{event.author}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Excerpt */}
        {event.excerpt && (
          <div className="text-xl text-primary-600 dark:text-primary-300 mb-12 pb-12 border-b border-primary-200 dark:border-primary-700 leading-relaxed bg-primary-50 dark:bg-primary-800 p-6 rounded-lg">
            {event.excerpt}
          </div>
        )}

        {/* Event Info Card */}
        <div className="bg-accent-50 dark:bg-accent-900/20 border border-accent-200 dark:border-accent-700 rounded-lg p-6 mb-12">
          <h2 className="text-2xl font-bold text-primary-900 dark:text-white mb-4">Event Details</h2>
          <div className="space-y-3 text-primary-700 dark:text-primary-300">
            <div className="flex items-start space-x-3">
              <Calendar className="w-5 h-5 mt-1 text-accent-600" />
              <div>
                <div className="font-semibold">Date & Time</div>
                <div>{formatEventDate(event.date, event.endDate)}</div>
              </div>
            </div>
            
            {event.location && (
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 mt-1 text-accent-600" />
                <div>
                  <div className="font-semibold">Location</div>
                  <div>{event.location}</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Event Content */}
        <ArticleContent content={event.content} />

        {/* Tags */}
        {event.tags && event.tags.length > 0 && (
          <div className="mt-12 pt-12 border-t border-primary-200 dark:border-primary-700">
            <div className="flex items-center flex-wrap gap-3">
              <Tag className="w-5 h-5 text-primary-500" />
              {event.tags.map((tag, index) => (
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

        {/* Back to Events Link */}
        <div className="mt-12 pt-12 border-t border-primary-200 dark:border-primary-700">
          <Link
            href="/events"
            className="inline-flex items-center text-accent-600 hover:text-accent-700 dark:text-accent-400 dark:hover:text-accent-300 font-semibold"
          >
            ← Back to all events
          </Link>
        </div>
      </div>
    </article>
  );
}

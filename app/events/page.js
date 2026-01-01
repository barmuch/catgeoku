'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, MapPin, Clock, Tag, User } from 'lucide-react';

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/events?upcoming=true');
      const data = await response.json();

      if (response.ok) {
        setEvents(data.events || []);
      }
    } catch (err) {
      console.error('Error fetching events:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString, endDateString) => {
    const start = new Date(dateString);
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    
    if (endDateString) {
      const end = new Date(endDateString);
      const isSameDay = start.toDateString() === end.toDateString();
      
      if (!isSameDay) {
        return `${start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${end.toLocaleDateString('en-US', options)}`;
      }
    }
    
    return start.toLocaleDateString('en-US', options);
  };

  const getEventStatus = (dateString) => {
    const eventDate = new Date(dateString);
    const today = new Date();
    const diffDays = Math.ceil((eventDate - today) / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return { text: 'Past', color: 'text-gray-500' };
    if (diffDays <= 7) return { text: 'This Week', color: 'text-red-600 dark:text-red-400' };
    if (diffDays <= 30) return { text: 'This Month', color: 'text-orange-600 dark:text-orange-400' };
    return { text: 'Upcoming', color: 'text-green-600 dark:text-green-400' };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-primary-900 pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-600 mx-auto mb-4"></div>
          <p className="text-primary-600 dark:text-primary-400">Loading events...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-primary-50 via-white to-primary-50 dark:from-primary-950 dark:via-primary-900 dark:to-primary-950">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 bg-accent-100 dark:bg-accent-900/30 rounded-full mb-6">
            <Calendar className="w-4 h-4 text-accent-600 dark:text-accent-400 mr-2" />
            <span className="text-sm font-semibold text-accent-700 dark:text-accent-300">
              Engineering Events & Conferences
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
            <span className="bg-gradient-to-r from-primary-900 via-accent-600 to-primary-900 dark:from-primary-50 dark:via-accent-400 dark:to-primary-50 bg-clip-text text-transparent">
              Connect, Learn & Grow
            </span>
          </h1>
          
          <p className="text-xl text-primary-600 dark:text-primary-300 max-w-3xl mx-auto">
            Join industry-leading conferences, workshops, and webinars to stay ahead in geological, geophysical, drilling, and petroleum engineering.
          </p>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-display font-bold text-primary-900 dark:text-white mb-8 flex items-center">
            <span className="w-1 h-8 bg-accent-500 mr-4 rounded-full"></span>
            {events.length === 0 ? 'No Events Available' : `Upcoming Events (${events.length})`}
          </h2>

          {events.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="w-16 h-16 text-primary-300 mx-auto mb-4" />
              <p className="text-xl text-primary-500">No upcoming events at the moment. Check back soon!</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => {
                const status = getEventStatus(event.date);
                
                return (
                  <Link key={event.id} href={`/events/${event.slug}`}>
                    <div className="card-hover group h-full">
                      {/* Event Image */}
                      {event.featuredImage ? (
                        <div className="relative h-48 rounded-t-2xl overflow-hidden">
                          <Image
                            src={event.featuredImage}
                            alt={event.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute top-4 left-4">
                            <span className={`badge ${status.color} bg-white/90`}>
                              {status.text}
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div className="relative h-48 bg-gradient-to-br from-accent-500 to-primary-900 rounded-t-2xl overflow-hidden">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Calendar className="w-16 h-16 text-white/30" />
                          </div>
                          <div className="absolute top-4 left-4">
                            <span className={`badge ${status.color} bg-white/90`}>
                              {status.text}
                            </span>
                          </div>
                        </div>
                      )}
                      
                      <div className="p-6">
                        <h3 className="text-xl font-display font-bold text-primary-900 dark:text-white mb-3 group-hover:text-accent-600 dark:group-hover:text-accent-400 transition-colors line-clamp-2">
                          {event.title}
                        </h3>
                        
                        {event.excerpt && (
                          <p className="text-primary-600 dark:text-primary-300 text-sm mb-4 line-clamp-2">
                            {event.excerpt}
                          </p>
                        )}
                        
                        <div className="space-y-2 mb-4 text-sm">
                          <div className="flex items-center text-primary-700 dark:text-primary-200">
                            <Calendar className="w-4 h-4 mr-2 text-accent-500" />
                            <span>{formatDate(event.date, event.endDate)}</span>
                          </div>
                          
                          {event.location && (
                            <div className="flex items-center text-primary-700 dark:text-primary-200">
                              <MapPin className="w-4 h-4 mr-2 text-accent-500" />
                              <span>{event.location}</span>
                            </div>
                          )}
                          
                          {event.author && (
                            <div className="flex items-center text-primary-700 dark:text-primary-200">
                              <User className="w-4 h-4 mr-2 text-accent-500" />
                              <span>{event.author}</span>
                            </div>
                          )}
                        </div>

                        {/* Tags */}
                        {event.tags && event.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {event.tags.slice(0, 3).map((tag, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 bg-accent-100 dark:bg-accent-900/30 text-accent-700 dark:text-accent-300 text-xs rounded-full"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

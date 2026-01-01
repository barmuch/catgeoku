'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/providers/AuthContext';
import Link from 'next/link';
import { DocumentTextIcon, CalendarIcon, CheckCircleIcon, ClockIcon } from '@heroicons/react/24/outline';

export default function AdminDashboard() {
  const router = useRouter();
  const { user, loading: authLoading, getAuthHeaders } = useAuth();
  const [stats, setStats] = useState({
    totalArticles: 0,
    publishedArticles: 0,
    draftArticles: 0,
    totalEvents: 0,
    publishedEvents: 0,
    upcomingEvents: 0,
    totalCategories: 0,
  });
  const [recentArticles, setRecentArticles] = useState([]);
  const [recentEvents, setRecentEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/admin/login');
      return;
    }

    if (user) {
      fetchDashboardData();
    }
  }, [user, authLoading, router]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const headers = getAuthHeaders();
      
      // Fetch articles stats
      const articlesRes = await fetch('/api/admin/articles?limit=5', { headers });
      const articlesData = await articlesRes.json();
      if (articlesRes.ok) {
        setRecentArticles(articlesData.articles || []);
        setStats(prev => ({
          ...prev,
          totalArticles: articlesData.pagination?.total || 0,
        }));
      }

      // Fetch published articles count
      const publishedRes = await fetch('/api/admin/articles?published=true&limit=1', { headers });
      const publishedData = await publishedRes.json();
      if (publishedRes.ok) {
        setStats(prev => ({
          ...prev,
          publishedArticles: publishedData.pagination?.total || 0,
        }));
      }

      // Fetch draft articles count
      const draftRes = await fetch('/api/admin/articles?published=false&limit=1', { headers });
      const draftData = await draftRes.json();
      if (draftRes.ok) {
        setStats(prev => ({
          ...prev,
          draftArticles: draftData.pagination?.total || 0,
        }));
      }

      // Fetch events stats
      const eventsRes = await fetch('/api/admin/events?limit=5', { headers });
      const eventsData = await eventsRes.json();
      if (eventsRes.ok) {
        setRecentEvents(eventsData.events || []);
        setStats(prev => ({
          ...prev,
          totalEvents: eventsData.pagination?.total || 0,
        }));
      }

      // Fetch published events count
      const publishedEventsRes = await fetch('/api/admin/events?published=true&limit=1', { headers });
      const publishedEventsData = await publishedEventsRes.json();
      if (publishedEventsRes.ok) {
        setStats(prev => ({
          ...prev,
          publishedEvents: publishedEventsData.pagination?.total || 0,
        }));
      }

      // Fetch categories
      const categoriesRes = await fetch('/api/admin/categories');
      const categoriesData = await categoriesRes.json();
      if (categoriesRes.ok) {
        setStats(prev => ({
          ...prev,
          totalCategories: categoriesData.categories?.length || 0,
        }));
      }

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary-900 dark:text-white">Dashboard</h1>
        <p className="text-primary-600 dark:text-primary-400 mt-2">Welcome back!</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Articles Stats */}
        <StatCard
          title="Total Articles"
          value={stats.totalArticles}
          icon={<DocumentTextIcon className="w-8 h-8" />}
          color="blue"
          link="/admin/articles"
        />
        <StatCard
          title="Published Articles"
          value={stats.publishedArticles}
          icon={<CheckCircleIcon className="w-8 h-8" />}
          color="green"
        />
        <StatCard
          title="Draft Articles"
          value={stats.draftArticles}
          icon={<ClockIcon className="w-8 h-8" />}
          color="yellow"
        />
        
        {/* Events Stats */}
        <StatCard
          title="Total Events"
          value={stats.totalEvents}
          icon={<CalendarIcon className="w-8 h-8" />}
          color="purple"
          link="/admin/events"
        />
        <StatCard
          title="Published Events"
          value={stats.publishedEvents}
          icon={<CheckCircleIcon className="w-8 h-8" />}
          color="indigo"
        />
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-primary-800 rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-bold text-primary-900 dark:text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            href="/admin/articles/new"
            className="flex items-center justify-center px-6 py-4 bg-accent-600 text-white rounded-lg hover:bg-accent-700 transition-colors shadow-md hover:shadow-lg"
          >
            <DocumentTextIcon className="w-5 h-5 mr-2" />
            New Article
          </Link>
          <Link
            href="/admin/events/new"
            className="flex items-center justify-center px-6 py-4 bg-accent-500 text-white rounded-lg hover:bg-accent-600 transition-colors shadow-md hover:shadow-lg"
          >
            <CalendarIcon className="w-5 h-5 mr-2" />
            New Event
          </Link>
        </div>
      </div>

      {/* Recent Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Articles */}
        <div className="bg-white dark:bg-primary-800 rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-primary-900 dark:text-white">Recent Articles</h2>
            <Link href="/admin/articles" className="text-accent-600 hover:text-accent-800 dark:text-accent-400 text-sm">
              View all →
            </Link>
          </div>
          {loading ? (
            <div className="text-center py-8 text-primary-500">Loading...</div>
          ) : recentArticles.length === 0 ? (
            <div className="text-center py-8 text-primary-500">No articles yet</div>
          ) : (
            <div className="space-y-4">
              {recentArticles.map((article) => (
                <div key={article.id} className="border-b border-primary-200 dark:border-primary-700 pb-4 last:border-0">
                  <Link href={`/admin/articles/${article.id}/edit`}>
                    <h3 className="font-medium text-primary-900 dark:text-white hover:text-accent-600 dark:hover:text-accent-400">
                      {article.title}
                    </h3>
                  </Link>
                  <p className="text-sm text-primary-500 dark:text-primary-400 mt-1 line-clamp-2">
                    {article.excerpt || 'No excerpt'}
                  </p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${article.published ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'}`}>
                      {article.published ? 'Published' : 'Draft'}
                    </span>
                    <span className="text-xs text-primary-500">
                      {new Date(article.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Events */}
        <div className="bg-white dark:bg-primary-800 rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-primary-900 dark:text-white">Recent Events</h2>
            <Link href="/admin/events" className="text-accent-600 hover:text-accent-800 dark:text-accent-400 text-sm">
              View all →
            </Link>
          </div>
          {loading ? (
            <div className="text-center py-8 text-primary-500">Loading...</div>
          ) : recentEvents.length === 0 ? (
            <div className="text-center py-8 text-primary-500">No events yet</div>
          ) : (
            <div className="space-y-4">
              {recentEvents.map((event) => (
                <div key={event.id} className="border-b border-primary-200 dark:border-primary-700 pb-4 last:border-0">
                  <Link href={`/admin/events/${event.id}/edit`}>
                    <h3 className="font-medium text-primary-900 dark:text-white hover:text-accent-600 dark:hover:text-accent-400">
                      {event.title}
                    </h3>
                  </Link>
                  <p className="text-sm text-primary-500 dark:text-primary-400 mt-1">
                    {event.location || 'No location'}
                  </p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${event.published ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'}`}>
                      {event.published ? 'Published' : 'Draft'}
                    </span>
                    <span className="text-xs text-primary-500">
                      {new Date(event.date).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// StatCard Component
function StatCard({ title, value, icon, color, link }) {
  const colors = {
    blue: 'bg-accent-100 dark:bg-accent-900 text-accent-600 dark:text-accent-400',
    green: 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400',
    yellow: 'bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-400',
    purple: 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400',
    indigo: 'bg-accent-100 dark:bg-accent-900 text-accent-700 dark:text-accent-500',
    pink: 'bg-pink-100 dark:bg-pink-900 text-pink-600 dark:text-pink-400',
  };

  const card = (
    <div className="bg-white dark:bg-primary-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-primary-600 dark:text-primary-400">{title}</p>
          <p className="text-3xl font-bold text-primary-900 dark:text-white mt-2">
            {value}
          </p>
        </div>
        <div className={`p-3 rounded-full ${colors[color]}`}>
          {icon}
        </div>
      </div>
    </div>
  );

  return link ? <Link href={link}>{card}</Link> : card;
}

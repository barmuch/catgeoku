'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  HomeIcon, 
  DocumentTextIcon, 
  CalendarIcon, 
  CogIcon,
  ChartBarIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: HomeIcon },
  { name: 'Articles', href: '/admin/articles', icon: DocumentTextIcon },
  { name: 'Events', href: '/admin/events', icon: CalendarIcon },
  { name: 'Settings', href: '/admin/settings', icon: CogIcon },
];

export default function AdminSidebar({ isOpen, onClose }) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-30 h-screen w-64 bg-white dark:bg-primary-800 
          border-r border-primary-200 dark:border-primary-700 
          transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:static lg:z-0
        `}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-6 border-b border-primary-200 dark:border-primary-700">
            <Link href="/admin/dashboard" className="flex items-center gap-2">
              <ChartBarIcon className="w-8 h-8 text-accent-600 dark:text-accent-500" />
              <span className="text-xl font-bold text-primary-900 dark:text-white">
                Admin Panel
              </span>
            </Link>
            <button
              onClick={onClose}
              className="lg:hidden text-primary-500 hover:text-primary-700 dark:text-primary-400"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => onClose()}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium
                    transition-colors duration-200
                    ${
                      isActive
                        ? 'bg-accent-50 text-accent-700 dark:bg-accent-900/20 dark:text-accent-400'
                        : 'text-primary-700 hover:bg-primary-50 dark:text-primary-300 dark:hover:bg-primary-700'
                    }
                  `}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* User info */}
          <div className="px-4 py-4 border-t border-primary-200 dark:border-primary-700">
            <div className="flex items-center gap-3 px-4 py-2">
              <div className="w-8 h-8 rounded-full bg-accent-600 flex items-center justify-center">
                <UserGroupIcon className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-primary-900 dark:text-white truncate">
                  Admin
                </p>
                <p className="text-xs text-primary-500 dark:text-primary-400 truncate">
                  admin@catgeoku.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

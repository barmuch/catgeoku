'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { AuthProvider } from '@/components/providers/AuthContext'
import AdminSidebar from '@/components/admin/AdminSidebar'

export default function AdminLayout({ children }) {
  const pathname = usePathname()
  const isLoginPage = pathname === '/admin/login'
  const [sidebarOpen, setSidebarOpen] = useState(false)
  
  // Login page gets full screen
  if (isLoginPage) {
    return (
      <AuthProvider>
        <div className="fixed inset-0 z-50 bg-white dark:bg-gray-900">
          {children}
        </div>
      </AuthProvider>
    )
  }
  
  // Dashboard and other admin pages with sidebar layout
  return (
    <AuthProvider>
      <div className="flex h-screen bg-primary-50 dark:bg-primary-950">
        {/* Sidebar */}
        <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        
        {/* Main content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Top bar */}
          <header className="h-16 bg-white dark:bg-primary-800 border-b border-primary-200 dark:border-primary-700 flex items-center justify-between px-6">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-primary-500 hover:text-primary-700 dark:text-primary-400"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h1 className="text-xl font-semibold text-primary-900 dark:text-white">
              {pathname === '/admin/dashboard' && 'Dashboard'}
              {pathname?.startsWith('/admin/articles') && 'Articles Management'}
              {pathname?.startsWith('/admin/events') && 'Events Management'}
              {pathname?.startsWith('/admin/categories') && 'Categories Management'}
              {pathname?.startsWith('/admin/settings') && 'Settings'}
            </h1>
            <div className="w-6 lg:w-0" />
          </header>
          
          {/* Page content */}
          <main className="flex-1 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </AuthProvider>
  )
}

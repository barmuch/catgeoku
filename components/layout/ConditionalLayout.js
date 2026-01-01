'use client'

import { usePathname } from 'next/navigation'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export default function ConditionalLayout({ children }) {
  const pathname = usePathname()
  const isAdminPage = pathname?.startsWith('/admin') && pathname !== '/admin/login'
  const isAdminLogin = pathname === '/admin/login'
  
  return (
    <div className="flex flex-col min-h-screen">
      {/* Show Navbar on non-admin pages; admin pages have their own layout */}
      {!pathname?.startsWith('/admin') && <Navbar />}
      <main className="flex-grow">
        {children}
      </main>
      {!isAdminPage && <Footer />}
    </div>
  )
}

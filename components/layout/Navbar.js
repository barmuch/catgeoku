'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X, ChevronDown, Moon, Sun } from 'lucide-react'
import { useTheme } from '@/components/providers/ThemeProvider'

const categories = [
  {
    name: 'Geology',
    href: '/geology',
    description: 'Geological engineering and earth sciences'
  },
  {
    name: 'Geophysics',
    href: '/geophysics',
    description: 'Geophysical methods and analysis'
  },
  {
    name: 'Drilling Engineering',
    href: '/drilling-engineering',
    description: 'Drilling operations and technology'
  },
  {
    name: 'Petroleum Engineering',
    href: '/petroleum-engineering',
    description: 'Oil and gas reservoir engineering'
  },
  {
    name: 'Science',
    href: '/science',
    description: 'Scientific research and discoveries'
  }
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false)
  const pathname = usePathname()
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 dark:bg-primary-900/90 backdrop-blur-md shadow-lg'
          : 'bg-white dark:bg-primary-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
              <Image 
                src="/Logo_catgeoku-removebg-preview.png" 
                alt="catgeoku Logo" 
                width={40} 
                height={40}
                className="object-contain"
              />
            </div>
            <span className="text-xl md:text-2xl font-display font-bold">
              <span style={{ color: '#1C1C1C', textShadow: '-0.5px -0.5px 0 white, 0.5px -0.5px 0 white, -0.5px 0.5px 0 white, 0.5px 0.5px 0 white, -0.5px 0 0 white, 0.5px 0 0 white, 0 -0.5px 0 white, 0 0.5px 0 white' }} className="dark:text-[#1C1C1C]">cat</span>
              <span style={{ color: '#F06927' }} className="dark:text-[#F06927]">geoku</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className={`font-medium transition-colors duration-300 ${
                pathname === '/'
                  ? 'text-accent-600 dark:text-accent-400'
                  : 'text-primary-700 dark:text-primary-200 hover:text-accent-600 dark:hover:text-accent-400'
              }`}
            >
              Home
            </Link>
            {/* Events */}
             <Link
              href="/events"
              className={`font-medium transition-colors duration-300 ${
                pathname === '/events'
                  ? 'text-accent-600 dark:text-accent-400'
                  : 'text-primary-700 dark:text-primary-200 hover:text-accent-600 dark:hover:text-accent-400'
              }`}
            >
              Events
            </Link>
            {/* Categories Dropdown */}
            <div 
              className="relative group"
              onMouseEnter={() => setIsCategoriesOpen(true)}
              onMouseLeave={() => setIsCategoriesOpen(false)}
            >
              <button
                className="flex items-center space-x-1 font-medium text-primary-700 dark:text-primary-200 hover:text-accent-600 dark:hover:text-accent-400 transition-colors duration-300"
              >
                <span>Categories</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              {/* Mega Menu */}
              {isCategoriesOpen && (
                <div
                  className="absolute left-0 top-full pt-2"
                >
                  <div className="w-80 bg-white dark:bg-primary-800 rounded-2xl shadow-2xl border border-primary-200 dark:border-primary-700 p-4 animate-slide-down">
                    <div className="grid gap-2">
                      {categories.map((category) => (
                        <Link
                          key={category.href}
                          href={category.href}
                          className="p-3 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-700 transition-colors duration-300 group"
                        >
                          <div className="font-semibold text-primary-900 dark:text-white group-hover:text-accent-600 dark:group-hover:text-accent-400 transition-colors">
                            {category.name}
                          </div>
                          <div className="text-sm text-primary-600 dark:text-primary-300 mt-1">
                            {category.description}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/about"
              className={`font-medium transition-colors duration-300 ${
                pathname === '/about'
                  ? 'text-accent-600 dark:text-accent-400'
                  : 'text-primary-700 dark:text-primary-200 hover:text-accent-600 dark:hover:text-accent-400'
              }`}
            >
              About
            </Link>

            <Link
              href="/contact"
              className={`font-medium transition-colors duration-300 ${
                pathname === '/contact'
                  ? 'text-accent-600 dark:text-accent-400'
                  : 'text-primary-700 dark:text-primary-200 hover:text-accent-600 dark:hover:text-accent-400'
              }`}
            >
              Contact
            </Link>

           

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-primary-100 dark:bg-primary-800 hover:bg-primary-200 dark:hover:bg-primary-700 transition-colors duration-300"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <Moon className="w-5 h-5 text-primary-700" />
              ) : (
                <Sun className="w-5 h-5 text-primary-200" />
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-primary-100 dark:bg-primary-800"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <Moon className="w-5 h-5 text-primary-700" />
              ) : (
                <Sun className="w-5 h-5 text-primary-200" />
              )}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg bg-primary-100 dark:bg-primary-800"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-primary-700 dark:text-primary-200" />
              ) : (
                <Menu className="w-6 h-6 text-primary-700 dark:text-primary-200" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-primary-900 border-t border-primary-200 dark:border-primary-700 animate-slide-down">
          <div className="px-4 py-6 space-y-4">
            <Link
              href="/"
              className="block py-2 font-medium text-primary-700 dark:text-primary-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>

            <div className="space-y-2">
              <div className="font-semibold text-primary-900 dark:text-white mb-2">
                Categories
              </div>
              {categories.map((category) => (
                <Link
                  key={category.href}
                  href={category.href}
                  className="block pl-4 py-2 text-primary-600 dark:text-primary-300 hover:text-accent-600 dark:hover:text-accent-400"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {category.name}
                </Link>
              ))}
            </div>

            <Link
              href="/about"
              className="block py-2 font-medium text-primary-700 dark:text-primary-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>

            <Link
              href="/contact"
              className="block py-2 font-medium text-primary-700 dark:text-primary-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </Link>

            <Link
              href="/events"
              className="block py-2 font-medium text-primary-700 dark:text-primary-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Events
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}

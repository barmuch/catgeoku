'use client'

import Link from 'next/link'
import { Box, Waves, Drill, Droplet, Atom } from 'lucide-react'

const categories = [
  {
    name: 'Geology',
    description: 'Geological engineering, earth sciences, and structural analysis',
    icon: Box,
    href: '/geology',
    color: 'from-blue-500 to-blue-700',
    stats: '150+ Articles'
  },
  {
    name: 'Geophysics',
    description: 'Seismic analysis, electromagnetic methods, and data interpretation',
    icon: Waves,
    href: '/geophysics',
    color: 'from-purple-500 to-purple-700',
    stats: '120+ Articles'
  },
  {
    name: 'Drilling Engineering',
    description: 'Drilling operations, well planning, and completion techniques',
    icon: Drill,
    href: '/drilling-engineering',
    color: 'from-orange-500 to-orange-700',
    stats: '100+ Articles'
  },
  {
    name: 'Petroleum Engineering',
    description: 'Reservoir engineering, production optimization, and EOR methods',
    icon: Droplet,
    href: '/petroleum-engineering',
    color: 'from-green-500 to-green-700',
    stats: '90+ Articles'
  },
  {
    name: 'Science',
    description: 'Scientific research, discoveries, and interdisciplinary studies',
    icon: Atom,
    href: '/science',
    color: 'from-pink-500 to-pink-700',
    stats: '80+ Articles'
  },
]

export default function FeaturedCategories() {
  return (
    <section className="section-container bg-primary-50 dark:bg-primary-950">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-primary-900 dark:text-white mb-4">
          Explore by Category
        </h2>
        <p className="text-lg text-primary-600 dark:text-primary-300 max-w-2xl mx-auto">
          Dive deep into specialized engineering domains with curated content and resources.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category, index) => {
          const Icon = category.icon
          return (
            <Link
              key={category.href}
              href={category.href}
              className="group relative overflow-hidden bg-white dark:bg-primary-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
              
              <div className="relative p-8">
                {/* Icon */}
                <div className={`inline-flex p-4 bg-gradient-to-br ${category.color} rounded-2xl mb-6 shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-display font-bold text-primary-900 dark:text-white mb-3 group-hover:text-accent-600 dark:group-hover:text-accent-400 transition-colors">
                  {category.name}
                </h3>
                
                <p className="text-primary-600 dark:text-primary-300 mb-4 min-h-[3rem]">
                  {category.description}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-accent-600 dark:text-accent-400">
                    {category.stats}
                  </span>
                  <span className="text-accent-600 dark:text-accent-400 group-hover:translate-x-2 transition-transform duration-300">
                    →
                  </span>
                </div>
              </div>

              {/* Hover Effect Border */}
              <div className={`absolute inset-0 border-2 border-transparent group-hover:border-accent-500 rounded-2xl transition-colors duration-500`}></div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}

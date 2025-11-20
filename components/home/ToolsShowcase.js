'use client'

import Link from 'next/link'
import { Box, Calculator, LineChart, Layers, ArrowRight, Sparkles } from 'lucide-react'

const tools = [
  {
    name: '3D Geological Visualization',
    description: 'Interactive 3D spatial modeling with real-time IDW interpolation and volume calculations',
    icon: Box,
    href: '/tools/3d-visualization',
    features: ['WebGL Rendering', 'Real-time Updates', 'Export Data'],
    color: 'from-blue-500 to-cyan-500'
  },
  {
    name: 'Petrophysics Calculator',
    description: 'Advanced calculations for porosity, permeability, and fluid saturation analysis',
    icon: Calculator,
    href: '/tools/petrophysics',
    features: ['Multiple Equations', 'Unit Conversion', 'Batch Processing'],
    color: 'from-purple-500 to-pink-500'
  },
  {
    name: 'Log Quality Control',
    description: 'Automated quality control and validation for well log data',
    icon: LineChart,
    href: '/tools/log-qc',
    features: ['Auto Detection', 'Statistical Analysis', 'Report Generation'],
    color: 'from-orange-500 to-red-500'
  },
  {
    name: 'Lithology Interpretation',
    description: 'AI-powered lithology identification from well log responses',
    icon: Layers,
    href: '/tools/lithology',
    features: ['Machine Learning', 'Pattern Recognition', 'Confidence Scores'],
    color: 'from-green-500 to-emerald-500'
  },
]

export default function ToolsShowcase() {
  return (
    <section className="section-container bg-white dark:bg-primary-900">
      <div className="text-center mb-12">
        <div className="inline-flex items-center space-x-2 bg-accent-100 dark:bg-accent-900/30 px-4 py-2 rounded-full mb-6">
          <Sparkles className="w-4 h-4 text-accent-600 dark:text-accent-400" />
          <span className="text-sm font-semibold text-accent-700 dark:text-accent-300">
            Interactive Tools
          </span>
        </div>
        
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-primary-900 dark:text-white mb-4">
          Professional Engineering Tools
        </h2>
        <p className="text-lg text-primary-600 dark:text-primary-300 max-w-2xl mx-auto">
          Transform your workflow with our suite of powerful, browser-based engineering tools.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {tools.map((tool, index) => {
          const Icon = tool.icon
          return (
            <div
              key={tool.href}
              className="card-hover p-8 group animate-fade-in"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className={`p-4 bg-gradient-to-br ${tool.color} rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <Link
                  href={tool.href}
                  className="p-2 rounded-lg bg-primary-100 dark:bg-primary-700 text-primary-700 dark:text-primary-200 hover:bg-accent-500 hover:text-white transition-all duration-300 group-hover:translate-x-1"
                >
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>

              {/* Content */}
              <h3 className="text-2xl font-display font-bold text-primary-900 dark:text-white mb-3">
                {tool.name}
              </h3>
              
              <p className="text-primary-600 dark:text-primary-300 mb-6">
                {tool.description}
              </p>

              {/* Features */}
              <div className="flex flex-wrap gap-2">
                {tool.features.map((feature) => (
                  <span
                    key={feature}
                    className="px-3 py-1 bg-primary-100 dark:bg-primary-700 text-primary-700 dark:text-primary-200 rounded-full text-sm font-medium"
                  >
                    {feature}
                  </span>
                ))}
              </div>

              {/* Hover Indicator */}
              <div className="mt-6 pt-6 border-t border-primary-200 dark:border-primary-700">
                <Link
                  href="https://catgeoku-analysis.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-accent-600 dark:text-accent-400 font-semibold group-hover:space-x-3 transition-all duration-300"
                >
                  <span>Launch Tool</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          )
        })}
      </div>

      {/* CTA */}
      <div className="mt-12 text-center">
        <div className="inline-block p-8 bg-gradient-to-br from-accent-500 to-accent-700 rounded-3xl shadow-2xl">
          <h3 className="text-2xl font-display font-bold text-white mb-3">
            Need Custom Tools?
          </h3>
          <p className="text-accent-100 mb-6 max-w-md">
            We build custom engineering software tailored to your specific needs.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-white text-accent-600 rounded-lg font-semibold hover:bg-accent-50 transition-colors duration-300"
          >
            <span>Get in Touch</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}

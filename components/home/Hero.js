'use client'

import Link from 'next/link'
import { ArrowRight, Sparkles, Code2, Database } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-50 via-white to-accent-50 dark:from-primary-950 dark:via-primary-900 dark:to-primary-900 pt-20">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-accent-200 dark:bg-accent-900/20 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary-200 dark:bg-primary-800/20 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-70 animate-blob animation-delay-200"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-accent-300 dark:bg-accent-800/20 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-70 animate-blob animation-delay-400"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center space-x-2 bg-white dark:bg-primary-800 px-4 py-2 rounded-full shadow-lg mb-8"
          >
            <Sparkles className="w-4 h-4 text-accent-600" />
            <span className="text-sm font-medium text-primary-700 dark:text-primary-200">
              Advanced Engineering Platform
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold text-primary-900 dark:text-white mb-6 leading-tight"
          >
            Engineering Tools &<br />
            <span className="text-gradient">Knowledge Platform</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg sm:text-xl md:text-2xl text-primary-600 dark:text-primary-300 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Interactive 3D visualizations, comprehensive technical articles, 
            and professional resources for geological, geophysical, drilling, 
            and petroleum engineers.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Link href="#articles" className="btn-primary group">
              Explore Articles
              <ArrowRight className="inline-block w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="https://catgeoku-analysis.vercel.app/" target="_blank" rel="noopener noreferrer" className="btn-outline group">
              Try Our Software
              <Code2 className="inline-block w-5 h-5 ml-2 group-hover:rotate-12 transition-transform" />
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
          >
            {[
              { label: 'Technical Articles', value: '500+' },
              { label: 'Interactive Tools', value: '15+' },
              { label: 'Engineers Worldwide', value: '50K+' },
              { label: 'Code Samples', value: '200+' },
            ].map((stat, index) => (
              <div
                key={index}
                className="p-6 bg-white dark:bg-primary-800 rounded-2xl shadow-lg border border-primary-200 dark:border-primary-700"
              >
                <div className="text-3xl font-display font-bold text-accent-600 dark:text-accent-400 mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-primary-600 dark:text-primary-300">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-primary-300 dark:border-primary-600 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary-600 dark:bg-primary-400 rounded-full mt-2 animate-bounce"></div>
        </div>
      </motion.div>

      <style jsx>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
      `}</style>
    </section>
  )
}

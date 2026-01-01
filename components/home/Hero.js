'use client'

import Link from 'next/link'
import { ArrowRight, Sparkles, Code2, Database } from 'lucide-react'
import { motion } from 'framer-motion'
import { useLanguage } from '@/components/providers/LanguageProvider'

export default function Hero() {
  const { t } = useLanguage()
  
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-50 via-white to-accent-50 dark:from-primary-950 dark:via-primary-900 dark:to-primary-900 pt-20">
      {/* Animated Background with Liquid Effect */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Main orange blob with wave effect */}
        <motion.div
          className="absolute w-96 h-96 opacity-60"
          style={{
            left: '10%',
            top: '10%',
          }}
          animate={{
            x: ['0vw', '70vw', '40vw', '80vw', '0vw'],
            y: ['0vh', '60vh', '20vh', '70vh', '0vh'],
            scale: [1, 1.2, 0.9, 1.15, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-accent-400 to-accent-600 dark:from-accent-600 dark:to-accent-800 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl animate-wave"></div>
        </motion.div>

        {/* Secondary blob */}
        <motion.div
          className="absolute w-80 h-80 opacity-50"
          style={{
            left: '70%',
            top: '70%',
          }}
          animate={{
            x: ['0vw', '-60vw', '-30vw', '-70vw', '0vw'],
            y: ['0vh', '-50vh', '-70vh', '-30vh', '0vh'],
            scale: [1, 0.95, 1.15, 0.9, 1],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-accent-300 to-accent-500 dark:from-accent-700 dark:to-accent-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl animate-wave-slow"></div>
        </motion.div>

        {/* Third blob */}
        <motion.div
          className="absolute w-72 h-72 opacity-40"
          style={{
            left: '50%',
            top: '50%',
          }}
          animate={{
            x: ['0vw', '-40vw', '50vw', '-30vw', '0vw'],
            y: ['0vh', '40vh', '-40vh', '30vh', '0vh'],
            scale: [1, 1.1, 0.85, 1.2, 1],
          }}
          transition={{
            duration: 28,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-orange-600 dark:from-orange-600 dark:to-orange-800 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl animate-wave-slower"></div>
        </motion.div>
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
              {t('hero.badge')}
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold text-primary-900 dark:text-white mb-6 leading-tight"
          >
            {t('hero.title')}<br />
            <span className="text-gradient">{t('hero.titleHighlight')}</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg sm:text-xl md:text-2xl text-primary-600 dark:text-primary-300 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            {t('hero.subtitle')}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Link href="#articles" className="btn-primary group">
              {t('hero.exploreArticles')}
              <ArrowRight className="inline-block w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="https://catgeoku-analysis.vercel.app/" target="_blank" rel="noopener noreferrer" className="btn-outline group">
              {t('hero.trySoftware')}
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
              { label: t('hero.stats.articles'), value: '500+' },
              { label: t('hero.stats.tools'), value: '15+' },
              { label: t('hero.stats.engineers'), value: '50K+' },
              { label: t('hero.stats.samples'), value: '200+' },
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
        @keyframes wave {
          0%, 100% {
            border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
          }
          25% {
            border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%;
          }
          50% {
            border-radius: 50% 60% 30% 60% / 30% 60% 70% 40%;
          }
          75% {
            border-radius: 60% 40% 60% 40% / 70% 30% 50% 60%;
          }
        }
        
        @keyframes wave-slow {
          0%, 100% {
            border-radius: 40% 60% 60% 40% / 60% 30% 70% 40%;
          }
          33% {
            border-radius: 60% 40% 30% 70% / 50% 60% 40% 60%;
          }
          66% {
            border-radius: 30% 60% 70% 40% / 40% 50% 60% 50%;
          }
        }
        
        @keyframes wave-slower {
          0%, 100% {
            border-radius: 50% 50% 40% 60% / 40% 70% 60% 50%;
          }
          50% {
            border-radius: 70% 30% 50% 50% / 30% 50% 70% 50%;
          }
        }
        
        .animate-wave {
          animation: wave 8s ease-in-out infinite;
        }
        
        .animate-wave-slow {
          animation: wave-slow 10s ease-in-out infinite;
        }
        
        .animate-wave-slower {
          animation: wave-slower 12s ease-in-out infinite;
        }
      `}</style>
    </section>
  )
}

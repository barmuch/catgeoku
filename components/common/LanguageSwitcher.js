'use client'

import { useState } from 'react'
import { Globe, Check } from 'lucide-react'
import { useLanguage } from '@/components/providers/LanguageProvider'
import { languages } from '@/lib/translations'

export default function LanguageSwitcher() {
  const { language, changeLanguage } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg bg-primary-100 dark:bg-primary-800 hover:bg-primary-200 dark:hover:bg-primary-700 transition-colors duration-300 flex items-center space-x-2"
        aria-label="Change language"
      >
        <Globe className="w-5 h-5 text-primary-700 dark:text-primary-200" />
        <span className="hidden sm:inline text-sm font-medium text-primary-700 dark:text-primary-200">
          {languages.find(l => l.code === language)?.flag}
        </span>
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-primary-800 rounded-2xl shadow-2xl border border-primary-200 dark:border-primary-700 py-2 z-50 max-h-96 overflow-y-auto">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  changeLanguage(lang.code)
                  setIsOpen(false)
                }}
                className={`w-full px-4 py-3 text-left hover:bg-primary-50 dark:hover:bg-primary-700 transition-colors flex items-center justify-between ${
                  language === lang.code ? 'bg-primary-50 dark:bg-primary-700' : ''
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{lang.flag}</span>
                  <span className="text-sm font-medium text-primary-900 dark:text-white">
                    {lang.name}
                  </span>
                </div>
                {language === lang.code && (
                  <Check className="w-5 h-5 text-accent-600 dark:text-accent-400" />
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

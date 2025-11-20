'use client'

import { useState } from 'react'
import { Mail, Send, CheckCircle } from 'lucide-react'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle, loading, success, error

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')

    // Simulate API call
    setTimeout(() => {
      setStatus('success')
      setEmail('')
      setTimeout(() => setStatus('idle'), 3000)
    }, 1000)
  }

  return (
    <section className="section-container bg-primary-900 dark:bg-primary-950">
      <div className="max-w-4xl mx-auto">
        <div className="relative overflow-hidden bg-gradient-to-br from-accent-500 to-accent-700 rounded-3xl shadow-2xl p-8 md:p-12 lg:p-16">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
            }}></div>
          </div>

          <div className="relative z-10 text-center">
            {/* Icon */}
            <div className="inline-flex p-4 bg-white/20 rounded-2xl mb-6">
              <Mail className="w-8 h-8 text-white" />
            </div>

            {/* Heading */}
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
              Stay Updated with Latest Insights
            </h2>
            
            <p className="text-lg text-accent-100 mb-8 max-w-2xl mx-auto">
              Join 10,000+ engineers receiving weekly updates on new articles, 
              tools, and engineering best practices.
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  disabled={status === 'loading' || status === 'success'}
                  className="flex-1 px-6 py-4 bg-white rounded-xl focus:outline-none focus:ring-4 focus:ring-white/50 text-primary-900 placeholder-primary-400 disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={status === 'loading' || status === 'success'}
                  className="px-8 py-4 bg-primary-900 text-white rounded-xl font-semibold hover:bg-primary-800 transition-all duration-300 disabled:opacity-50 flex items-center justify-center space-x-2 whitespace-nowrap"
                >
                  {status === 'success' ? (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      <span>Subscribed!</span>
                    </>
                  ) : status === 'loading' ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Subscribing...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Subscribe</span>
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Privacy Notice */}
            <p className="text-sm text-accent-100 mt-4">
              No spam ever. Unsubscribe anytime. We respect your privacy.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

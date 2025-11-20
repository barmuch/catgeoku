'use client'

import { useState } from 'react'
import { Mail, MapPin, Phone, Send, CheckCircle, AlertCircle } from 'lucide-react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [status, setStatus] = useState('idle') // idle, loading, success, error

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')

    // Simulate API call
    setTimeout(() => {
      setStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })
      setTimeout(() => setStatus('idle'), 5000)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-primary-50 dark:bg-primary-950 pt-20">
      {/* Header */}
      <section className="bg-gradient-to-br from-primary-900 to-primary-800 dark:from-primary-950 dark:to-primary-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6">
            Get in Touch
          </h1>
          <p className="text-xl text-primary-200 max-w-2xl mx-auto">
            Have a question, suggestion, or need custom engineering software? 
            We&apos;d love to hear from you.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-6">
            <div className="card p-6">
              <Mail className="w-8 h-8 text-accent-600 mb-4" />
              <h3 className="text-lg font-display font-bold text-primary-900 dark:text-white mb-2">
                Email Us
              </h3>
              <a 
                href="mailto:contact@catgeoku.com"
                className="text-primary-600 dark:text-primary-300 hover:text-accent-600 dark:hover:text-accent-400 transition-colors"
              >
                contact@catgeoku.com
              </a>
            </div>

            <div className="card p-6">
              <MapPin className="w-8 h-8 text-accent-600 mb-4" />
              <h3 className="text-lg font-display font-bold text-primary-900 dark:text-white mb-2">
                Location
              </h3>
              <p className="text-primary-600 dark:text-primary-300">
                Global - Remote First<br />
                Serving engineers worldwide
              </p>
            </div>

            <div className="card p-6">
              <Phone className="w-8 h-8 text-accent-600 mb-4" />
              <h3 className="text-lg font-display font-bold text-primary-900 dark:text-white mb-2">
                Response Time
              </h3>
              <p className="text-primary-600 dark:text-primary-300">
                We typically respond within 24-48 hours
              </p>
            </div>

            <div className="card p-6 bg-gradient-to-br from-accent-500 to-accent-700">
              <h3 className="text-xl font-display font-bold text-white mb-3">
                Need Custom Solutions?
              </h3>
              <p className="text-accent-100 mb-4">
                We develop bespoke engineering software tailored to your specific requirements.
              </p>
              <button className="px-4 py-2 bg-white text-accent-600 rounded-lg font-semibold hover:bg-accent-50 transition-colors w-full">
                Learn More
              </button>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="card p-8">
              <h2 className="text-2xl font-display font-bold text-primary-900 dark:text-white mb-6">
                Send us a Message
              </h2>

              {status === 'success' && (
                <div className="mb-6 p-4 bg-green-100 dark:bg-green-900/30 border border-green-500 rounded-lg flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-green-800 dark:text-green-200">
                      Message sent successfully!
                    </p>
                    <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                      We&apos;ll get back to you as soon as possible.
                    </p>
                  </div>
                </div>
              )}

              {status === 'error' && (
                <div className="mb-6 p-4 bg-red-100 dark:bg-red-900/30 border border-red-500 rounded-lg flex items-start space-x-3">
                  <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-red-800 dark:text-red-200">
                      Something went wrong
                    </p>
                    <p className="text-sm text-red-700 dark:text-red-300 mt-1">
                      Please try again or email us directly.
                    </p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label 
                      htmlFor="name"
                      className="block text-sm font-semibold text-primary-700 dark:text-primary-300 mb-2"
                    >
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      disabled={status === 'loading'}
                      className="input"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label 
                      htmlFor="email"
                      className="block text-sm font-semibold text-primary-700 dark:text-primary-300 mb-2"
                    >
                      Your Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      disabled={status === 'loading'}
                      className="input"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label 
                    htmlFor="subject"
                    className="block text-sm font-semibold text-primary-700 dark:text-primary-300 mb-2"
                  >
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    disabled={status === 'loading'}
                    className="input"
                    placeholder="How can we help you?"
                  />
                </div>

                <div>
                  <label 
                    htmlFor="message"
                    className="block text-sm font-semibold text-primary-700 dark:text-primary-300 mb-2"
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    disabled={status === 'loading'}
                    rows={6}
                    className="input resize-none"
                    placeholder="Tell us more about your inquiry..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="btn-primary w-full md:w-auto flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === 'loading' ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/providers/AuthContext'
import { Lock, Mail, Eye, EyeOff } from 'lucide-react'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const { data, error: loginError } = await login(email, password)
      
      if (loginError) {
        setError(loginError.message || 'Login failed')
        return
      }

      if (data && data.user) {
        // Redirect to dashboard
        router.push('/admin/dashboard')
      }
    } catch (err) {
      console.error('Login error:', err)
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-accent-50 dark:from-primary-950 dark:via-primary-900 dark:to-primary-950 px-4">
      <div className="max-w-md w-full">
        <div className="card p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-accent-100 dark:bg-accent-900/30 rounded-full mb-4">
              <Lock className="w-8 h-8 text-accent-600 dark:text-accent-400" />
            </div>
            <h1 className="text-3xl font-display font-bold text-primary-900 dark:text-white mb-2">
              Admin Login
            </h1>
            <p className="text-primary-600 dark:text-primary-300">
              Sign in to manage catgeoku content
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-100 dark:bg-red-900/30 border border-red-500 rounded-lg text-red-700 dark:text-red-300 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-primary-900 dark:text-white mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-white dark:bg-primary-800 border border-primary-200 dark:border-primary-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 text-primary-900 dark:text-white"
                  placeholder="admin@catgeoku.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-primary-900 dark:text-white mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-11 py-3 bg-white dark:bg-primary-800 border border-primary-200 dark:border-primary-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 text-primary-900 dark:text-white"
                  placeholder="Enter password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-primary-400 hover:text-primary-600 dark:hover:text-primary-300"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 p-4 bg-primary-50 dark:bg-primary-800/50 rounded-lg">
            <p className="text-sm text-primary-600 dark:text-primary-300 text-center">
              <strong>Demo Credentials:</strong><br />
              Email: admin@catgeoku.com<br />
              Password: admin123
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

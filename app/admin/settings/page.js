'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAdmin } from '@/components/providers/AdminProvider'
import Link from 'next/link'
import { ArrowLeft, Save, User, Key, Globe, Palette } from 'lucide-react'

export default function SettingsPage() {
  const { isAdmin, adminUser } = useAdmin()
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    siteName: 'catgeoku',
    siteDescription: 'Advanced engineering tools and knowledge platform',
    contactEmail: 'contact@catgeoku.com',
    adminUsername: 'admin',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  useEffect(() => {
    if (!isAdmin) {
      router.push('/admin/login')
    } else {
      // Load settings from localStorage
      const savedSettings = localStorage.getItem('adminSettings')
      if (savedSettings) {
        const settings = JSON.parse(savedSettings)
        setFormData(prev => ({ ...prev, ...settings }))
      }
    }
  }, [isAdmin, router])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmitGeneral = (e) => {
    e.preventDefault()
    setSaving(true)

    try {
      const { siteName, siteDescription, contactEmail, adminUsername } = formData
      const settings = { siteName, siteDescription, contactEmail, adminUsername }
      localStorage.setItem('adminSettings', JSON.stringify(settings))
      
      setTimeout(() => {
        alert('Settings saved successfully!')
        setSaving(false)
      }, 500)
    } catch (error) {
      console.error('Error saving settings:', error)
      alert('Failed to save settings')
      setSaving(false)
    }
  }

  const handleSubmitPassword = (e) => {
    e.preventDefault()
    
    if (formData.newPassword !== formData.confirmPassword) {
      alert('New passwords do not match!')
      return
    }

    if (formData.newPassword.length < 6) {
      alert('Password must be at least 6 characters!')
      return
    }

    setSaving(true)

    try {
      // In a real app, this would update in the backend
      setTimeout(() => {
        alert('Password changed successfully!')
        setFormData(prev => ({
          ...prev,
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        }))
        setSaving(false)
      }, 500)
    } catch (error) {
      console.error('Error changing password:', error)
      alert('Failed to change password')
      setSaving(false)
    }
  }

  if (!isAdmin) {
    return null
  }

  return (
    <div className="min-h-screen bg-primary-50 dark:bg-primary-950 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/admin/dashboard"
            className="inline-flex items-center space-x-2 text-primary-600 dark:text-primary-400 hover:text-accent-600 dark:hover:text-accent-400 mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Dashboard</span>
          </Link>
          <h1 className="text-3xl font-display font-bold text-primary-900 dark:text-white">
            Settings
          </h1>
        </div>

        <div className="space-y-6">
          {/* General Settings */}
          <div className="card p-6">
            <h2 className="text-xl font-bold text-primary-900 dark:text-white mb-6 flex items-center">
              <Globe className="w-6 h-6 mr-2" />
              General Settings
            </h2>
            
            <form onSubmit={handleSubmitGeneral} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-primary-900 dark:text-white mb-2">
                  Site Name
                </label>
                <input
                  type="text"
                  name="siteName"
                  value={formData.siteName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-white dark:bg-primary-800 border border-primary-200 dark:border-primary-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 text-primary-900 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-primary-900 dark:text-white mb-2">
                  Site Description
                </label>
                <textarea
                  name="siteDescription"
                  value={formData.siteDescription}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-4 py-2 bg-white dark:bg-primary-800 border border-primary-200 dark:border-primary-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 text-primary-900 dark:text-white resize-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-primary-900 dark:text-white mb-2">
                  Contact Email
                </label>
                <input
                  type="email"
                  name="contactEmail"
                  value={formData.contactEmail}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-white dark:bg-primary-800 border border-primary-200 dark:border-primary-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 text-primary-900 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-primary-900 dark:text-white mb-2">
                  Admin Username
                </label>
                <input
                  type="text"
                  name="adminUsername"
                  value={formData.adminUsername}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-white dark:bg-primary-800 border border-primary-200 dark:border-primary-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 text-primary-900 dark:text-white"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={saving}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="w-5 h-5 mr-2 inline-block" />
                {saving ? 'Saving...' : 'Save General Settings'}
              </button>
            </form>
          </div>

          {/* Change Password */}
          <div className="card p-6">
            <h2 className="text-xl font-bold text-primary-900 dark:text-white mb-6 flex items-center">
              <Key className="w-6 h-6 mr-2" />
              Change Password
            </h2>
            
            <form onSubmit={handleSubmitPassword} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-primary-900 dark:text-white mb-2">
                  Current Password
                </label>
                <input
                  type="password"
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-white dark:bg-primary-800 border border-primary-200 dark:border-primary-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 text-primary-900 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-primary-900 dark:text-white mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-white dark:bg-primary-800 border border-primary-200 dark:border-primary-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 text-primary-900 dark:text-white"
                  required
                  minLength={6}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-primary-900 dark:text-white mb-2">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-white dark:bg-primary-800 border border-primary-200 dark:border-primary-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 text-primary-900 dark:text-white"
                  required
                  minLength={6}
                />
              </div>

              <button
                type="submit"
                disabled={saving}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Key className="w-5 h-5 mr-2 inline-block" />
                {saving ? 'Changing...' : 'Change Password'}
              </button>
            </form>
          </div>

          {/* Account Info */}
          <div className="card p-6">
            <h2 className="text-xl font-bold text-primary-900 dark:text-white mb-6 flex items-center">
              <User className="w-6 h-6 mr-2" />
              Account Information
            </h2>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center py-3 border-b border-primary-200 dark:border-primary-700">
                <span className="text-primary-600 dark:text-primary-400">Username</span>
                <span className="font-semibold text-primary-900 dark:text-white">{adminUser?.username || 'admin'}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-primary-200 dark:border-primary-700">
                <span className="text-primary-600 dark:text-primary-400">Role</span>
                <span className="inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300">
                  Administrator
                </span>
              </div>
              <div className="flex justify-between items-center py-3">
                <span className="text-primary-600 dark:text-primary-400">Session Expiry</span>
                <span className="font-semibold text-primary-900 dark:text-white">24 hours</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

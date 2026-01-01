'use client'

import { createContext, useContext, useState, useEffect } from 'react'

const AdminContext = createContext()

export function AdminProvider({ children }) {
  const [isAdmin, setIsAdmin] = useState(false)
  const [adminUser, setAdminUser] = useState(null)

  useEffect(() => {
    const adminData = localStorage.getItem('adminAuth')
    if (adminData) {
      const { user, expiry } = JSON.parse(adminData)
      if (expiry > Date.now()) {
        setIsAdmin(true)
        setAdminUser(user)
      } else {
        localStorage.removeItem('adminAuth')
      }
    }
  }, [])

  const login = (username, password) => {
    // Simple authentication - in production, use proper backend
    if (username === 'admin' && password === 'catgeoku2024') {
      const user = { username, role: 'admin' }
      const expiry = Date.now() + (24 * 60 * 60 * 1000) // 24 hours
      
      localStorage.setItem('adminAuth', JSON.stringify({ user, expiry }))
      setIsAdmin(true)
      setAdminUser(user)
      return true
    }
    return false
  }

  const logout = () => {
    localStorage.removeItem('adminAuth')
    setIsAdmin(false)
    setAdminUser(null)
  }

  return (
    <AdminContext.Provider value={{ isAdmin, adminUser, login, logout }}>
      {children}
    </AdminContext.Provider>
  )
}

export function useAdmin() {
  const context = useContext(AdminContext)
  if (!context) {
    throw new Error('useAdmin must be used within AdminProvider')
  }
  return context
}

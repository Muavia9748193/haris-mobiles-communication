'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { FaBell, FaUser } from 'react-icons/fa'

export default function AdminHeader() {
  const [user, setUser] = useState<any>(null)
  const [showNotifications, setShowNotifications] = useState(false)
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'Welcome to Admin Panel!', time: new Date().toLocaleString() },
    { id: 2, message: 'Check your store settings', time: new Date().toLocaleString() },
  ])

  useEffect(() => {
    getUser()
  }, [])

  const getUser = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    setUser(user)
  }

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications)
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target.closest('.notification-wrapper')) {
        setShowNotifications(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">Dashboard</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Manage your store</p>
        </div>
        <div className="flex items-center gap-4">
          {/* Notification Button */}
          <div className="relative notification-wrapper">
            <button
              onClick={toggleNotifications}
              className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition"
            >
              <FaBell className="text-gray-600 dark:text-gray-300 text-lg" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            </button>

            {/* Notification Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 z-50 overflow-hidden">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="font-semibold text-gray-800 dark:text-white">Notifications</h3>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="p-6 text-center text-gray-500">
                      <span className="text-3xl block mb-2">🔔</span>
                      No new notifications
                    </div>
                  ) : (
                    notifications.map((notif) => (
                      <div key={notif.id} className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 border-b border-gray-100 dark:border-gray-700 last:border-0">
                        <p className="text-sm text-gray-800 dark:text-white">{notif.message}</p>
                        <p className="text-xs text-gray-400 mt-1">{notif.time}</p>
                      </div>
                    ))
                  )}
                </div>
                <div className="p-2 border-t border-gray-200 dark:border-gray-700 text-center">
                  <button className="text-xs text-blue-600 dark:text-blue-400 hover:underline">
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User Avatar */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
              {user?.email?.[0]?.toUpperCase() || 'A'}
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium text-gray-800 dark:text-white">
                {user?.email || 'Admin'}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Administrator</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
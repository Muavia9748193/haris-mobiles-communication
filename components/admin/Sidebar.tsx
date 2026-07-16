'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FaHome, FaBox, FaShoppingBag, FaUsers, FaCog, FaSignOutAlt, FaPlus } from 'react-icons/fa'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const menuItems = [
    { icon: FaHome, label: 'Dashboard', href: '/admin/dashboard' },
    { icon: FaBox, label: 'Products', href: '/admin/products' },
    { icon: FaPlus, label: 'Add Product', href: '/admin/products/add' },
    { icon: FaShoppingBag, label: 'Orders', href: '/admin/orders' },
    { icon: FaUsers, label: 'Customers', href: '/admin/customers' },
    { icon: FaCog, label: 'Settings', href: '/admin/settings' },
  ]

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 shadow-lg z-50">
      <div className="p-4 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-lg">H</span>
          </div>
          <div>
            <h2 className="font-bold text-gray-800 dark:text-white text-sm">Admin Panel</h2>
            <p className="text-[10px] text-gray-500 dark:text-gray-400">Haris Mobiles</p>
          </div>
        </div>
      </div>

      <nav className="p-4 space-y-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.href || pathname?.startsWith(item.href + '/')
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                isActive
                  ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <item.icon className={`text-lg ${isActive ? 'text-blue-600 dark:text-blue-400' : ''}`} />
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          )
        })}
      </nav>

      <div className="absolute bottom-0 w-full p-4 border-t border-gray-200 dark:border-gray-800">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-xl transition"
        >
          <FaSignOutAlt className="text-lg" />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>
    </aside>
  )
}
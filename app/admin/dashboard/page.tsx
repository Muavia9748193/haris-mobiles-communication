'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { FaBox, FaShoppingBag, FaUsers, FaExclamationTriangle } from 'react-icons/fa'

export default function DashboardPage() {
  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    customers: 0,
    lowStock: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const { count: products } = await supabase
        .from('products')
        .select('*', { count: 'exact', head: true })

      const { count: orders } = await supabase
        .from('orders')
        .select('*', { count: 'exact', head: true })

      const { count: customers } = await supabase
        .from('users')
        .select('*', { count: 'exact', head: true })

      const { data: lowStock } = await supabase
        .from('products')
        .select('*')
        .lt('stock', 6)

      setStats({
        products: products || 0,
        orders: orders || 0,
        customers: customers || 0,
        lowStock: lowStock?.length || 0,
      })
    } catch (error) {
      console.error('Error fetching stats:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500">Loading...</p>
        </div>
      </div>
    )
  }

  const statCards = [
    { icon: FaBox, label: 'Total Products', value: stats.products, color: 'blue' },
    { icon: FaShoppingBag, label: 'Total Orders', value: stats.orders, color: 'green' },
    { icon: FaUsers, label: 'Customers', value: stats.customers, color: 'purple' },
    { icon: FaExclamationTriangle, label: 'Low Stock', value: stats.lowStock, color: 'red' },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {statCards.map((stat) => (
          <div key={stat.label} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-800 dark:text-white mt-1">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 bg-${stat.color}-100 dark:bg-${stat.color}-900/30 rounded-full flex items-center justify-center`}>
                <stat.icon className={`text-${stat.color}-600 dark:text-${stat.color}-400 text-xl`} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
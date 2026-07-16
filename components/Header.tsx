'use client'

import Link from 'next/link'
import { useState } from 'react'
import { FaSearch, FaShoppingCart, FaHeart, FaUser } from 'react-icons/fa'
import { useCart } from '@/hooks/useCart'

export default function Header() {
  const [search, setSearch] = useState('')
  const { cartCount } = useCart()

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md border-b border-gray-200">
      <div className="container mx-auto px-4">
        {/* Top Bar */}
        <div className="hidden md:flex justify-between items-center text-xs text-gray-500 py-1.5 border-b border-gray-100">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">📞 +92 344 9848193</span>
            <span className="flex items-center gap-1.5">📍 Main Bazar, Lassan Nawab</span>
            <span className="flex items-center gap-1.5">🕒 Mon-Sat 9AM - 9PM</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="hover:text-blue-600 transition">Sign In</Link>
            <Link href="/register" className="hover:text-blue-600 transition">Register</Link>
          </div>
        </div>

        {/* Main Header */}
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 flex-shrink-0 group">
            <div className="w-11 h-11 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform duration-300">
              <span className="text-white font-bold text-2xl">H</span>
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Haris
                </span>
                <span className="text-2xl md:text-3xl font-extrabold text-blue-700 dark:text-blue-400">
                  Mobile
                </span>
                <span className="relative">
                  <span className="inline-block px-2.5 py-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-[10px] font-extrabold rounded-lg tracking-wider shadow-md shadow-blue-500/30">
                    HMS
                  </span>
                  <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse"></span>
                </span>
              </div>
              <p className="text-[10px] text-gray-500 font-medium tracking-[0.2em] uppercase -mt-0.5">
                Communication
              </p>
            </div>
          </Link>

          {/* Search */}
          <div className="hidden md:flex flex-1 max-w-lg mx-6">
            <div className="relative w-full group">
              <input
                type="text"
                placeholder="Search for phones, accessories..."
                className="w-full px-5 py-2.5 bg-gray-100 border-2 border-transparent rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:bg-white transition-all text-sm group-hover:bg-gray-50"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <FaSearch className="absolute right-4 top-3.5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1 md:gap-2">
            <Link href="/wishlist" className="relative p-2 hover:bg-gray-100 rounded-full transition-colors">
              <FaHeart className="text-gray-600 text-lg hover:text-red-500 transition-colors" />
              <span className="absolute top-0 right-0 bg-red-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-lg shadow-red-500/30">
                0
              </span>
            </Link>

            {/* ✅ CART WITH COUNT */}
            <Link href="/cart" className="relative p-2 hover:bg-gray-100 rounded-full transition-colors">
              <FaShoppingCart className="text-gray-600 text-lg hover:text-blue-600 transition-colors" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/30">
                  {cartCount}
                </span>
              )}
            </Link>

            <Link href="/login" className="ml-1 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-semibold rounded-full hover:shadow-lg hover:shadow-blue-500/30 transition-all hover:scale-105 flex items-center gap-2">
              <FaUser className="text-sm" /> Sign In
            </Link>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-3">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-4 py-2 bg-gray-100 border border-transparent rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:bg-white transition-all text-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <FaSearch className="absolute right-4 top-3 text-gray-400" />
          </div>
        </div>
      </div>
    </header>
  )
}
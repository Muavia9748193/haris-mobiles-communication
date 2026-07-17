'use client'

import Link from 'next/link'
import { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { FaCheckCircle, FaWhatsapp, FaHome } from 'react-icons/fa'

// ✅ Component that uses useSearchParams — wrapped in Suspense
function OrderConfirmationContent() {
  const searchParams = useSearchParams()
  const [orderNumber, setOrderNumber] = useState('')

  useEffect(() => {
    const order = searchParams?.get('order')
    if (order) {
      setOrderNumber(order)
    } else {
      setOrderNumber('ORD-' + Date.now())
    }
  }, [searchParams])

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 text-center border border-green-100 dark:border-green-800">
        {/* Success Icon */}
        <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
          <FaCheckCircle className="text-6xl text-green-500" />
        </div>

        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          🎉 Order Placed Successfully!
        </h1>

        <p className="text-gray-600 dark:text-gray-300 mb-2">
          Thank you for shopping with us. Your order has been confirmed and will be processed soon.
        </p>

        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 mb-6">
          <p className="text-sm text-gray-500 dark:text-gray-400">Order Number</p>
          <p className="text-xl font-bold text-blue-600 dark:text-blue-400 font-mono">
            {orderNumber}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition hover:scale-105"
          >
            <FaHome /> Continue Shopping
          </Link>

          <a
            href="https://wa.me/923449848193?text=Hello%2C%20I%20just%20placed%20an%20order%20%23ORD-0001.%20Please%20confirm%20my%20order."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition hover:scale-105"
          >
            <FaWhatsapp /> Contact on WhatsApp
          </a>
        </div>

        <div className="mt-6 text-sm text-gray-500 dark:text-gray-400">
          <p>A confirmation email has been sent to your email address.</p>
          <p className="mt-1">You can track your order in the "My Orders" section.</p>
        </div>
      </div>
    </div>
  )
}

// ✅ Main component with Suspense boundary
export default function OrderConfirmation() {
  return (
    <Suspense
      fallback={
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-500">Loading order confirmation...</p>
          </div>
        </div>
      }
    >
      <OrderConfirmationContent />
    </Suspense>
  )
}
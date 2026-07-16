'use client'

import { useCart } from '@/hooks/useCart'
import Link from 'next/link'
import { FaTrash, FaPlus, FaMinus, FaShoppingCart } from 'react-icons/fa'

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart()

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-md mx-auto">
          <FaShoppingCart className="text-6xl text-gray-300 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Your Cart is Empty</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6">Browse our products and add items to your cart</p>
          <Link
            href="/products"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    )
  }

  const getDiscountedPrice = (price: number, discount: number) => {
    return discount > 0 ? price - (price * discount / 100) : price
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">🛒 Shopping Cart</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-8">{cartCount} items in your cart</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => {
            const discountedPrice = getDiscountedPrice(item.price, item.discount)
            return (
              <div
                key={item.id}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-4 flex flex-col sm:flex-row items-center gap-4 border border-gray-100 dark:border-gray-700"
              >
                {/* Image */}
                <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-4xl">📱</span>
                </div>

                {/* Details */}
                <div className="flex-1 w-full">
                  <h3 className="font-semibold text-gray-800 dark:text-white">{item.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{item.brand}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="font-bold text-blue-600">Rs. {Math.round(discountedPrice).toLocaleString()}</span>
                    {item.discount > 0 && (
                      <span className="text-xs text-gray-400 line-through">
                        Rs. {item.price.toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition"
                  >
                    <FaMinus className="text-xs" />
                  </button>
                  <span className="w-8 text-center font-medium">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition"
                  >
                    <FaPlus className="text-xs" />
                  </button>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition ml-2"
                  >
                    <FaTrash className="text-sm" />
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {/* Cart Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 border border-gray-100 dark:border-gray-700 sticky top-24">
            <h3 className="font-bold text-lg text-gray-800 dark:text-white mb-4">Order Summary</h3>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Subtotal ({cartCount} items)</span>
                <span className="font-medium">Rs. {Math.round(cartTotal).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Delivery Charges</span>
                <span className="text-green-600">Free</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Discount</span>
                <span className="text-red-500">- Rs. 0</span>
              </div>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 mt-4 pt-4">
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span className="text-blue-600">Rs. {Math.round(cartTotal).toLocaleString()}</span>
              </div>
            </div>

            <Link
              href="/checkout"
              className="w-full mt-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/30 transition hover:scale-[1.02] text-center block"
            >
              Proceed to Checkout →
            </Link>

            <Link
              href="/products"
              className="w-full mt-3 py-2 text-center text-sm text-blue-600 dark:text-blue-400 hover:underline block"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import { FaStar, FaStarHalfAlt, FaShoppingCart, FaArrowRight } from 'react-icons/fa'
import { useCart } from '@/hooks/useCart'

interface Product {
  id: string
  name: string
  brand: string
  price: number
  discount: number
  stock: number
  rating?: number
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const { addToCart } = useCart()  // ✅ IMPORTANT!

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .limit(8)

      if (error) {
        console.error('Error:', error)
      } else {
        setProducts(data || [])
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const renderStars = (rating: number = 4.5) => {
    const stars = []
    const full = Math.floor(rating)
    const half = rating % 1 >= 0.5

    for (let i = 0; i < full; i++) stars.push(<FaStar key={i} className="text-yellow-400 text-sm" />)
    if (half) stars.push(<FaStarHalfAlt key="half" className="text-yellow-400 text-sm" />)
    for (let i = stars.length; i < 5; i++) stars.push(<FaStar key={i} className="text-gray-300 text-sm" />)
    return stars
  }

  return (
    <div className="bg-white dark:bg-gray-950">
      
      {/* ===== HERO SECTION ===== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 text-white min-h-[85vh] flex items-center">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-[-30%] left-[-10%] w-[500px] h-[500px] rounded-full bg-blue-500 blur-3xl"></div>
          <div className="absolute bottom-[-30%] right-[-10%] w-[600px] h-[600px] rounded-full bg-purple-500 blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 py-20 md:py-28 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium border border-white/10">
                🔥 New Collection 2026
              </span>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Premium <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300">
                  Smartphones
                </span>
              </h1>
              <p className="text-lg text-blue-100/80 max-w-lg">
                Samsung • Apple • Xiaomi • Vivo — Latest models with exclusive discounts.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link 
                  href="/products" 
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-gray-900 font-semibold rounded-full hover:bg-gray-100 transition-all hover:scale-105 shadow-2xl shadow-blue-500/30"
                >
                  Shop Now <span>→</span>
                </Link>
                <Link 
                  href="/products" 
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full hover:bg-white/20 transition-all"
                >
                  Explore Deals
                </Link>
              </div>
              <div className="flex items-center gap-6 pt-4 text-sm text-blue-100/60">
                <span>✅ 100% Original</span>
                <span>🔒 Secure Checkout</span>
                <span>🚀 Free Delivery</span>
              </div>
            </div>
            <div className="hidden md:flex justify-center items-center">
              <div className="relative w-80 h-80 flex items-center justify-center animate-float">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-2xl"></div>
                <span className="text-9xl relative z-10 drop-shadow-2xl">📱</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 60L60 55C120 50 240 40 360 45C480 50 600 70 720 75C840 80 960 70 1080 60C1200 50 1320 40 1380 35L1440 30V120H1380C1320 120 1200 120 1080 120H360C240 120 120 120 60 120H0V60Z" fill="#f8fafc" className="dark:fill-gray-950"/>
          </svg>
        </div>
      </section>

      {/* ===== FEATURED PRODUCTS ===== */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row justify-between items-end mb-10">
          <div>
            <h2 className="section-title text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              ⚡ Featured Products
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2">Best selling and trending smartphones</p>
          </div>
          <Link href="/products" className="text-blue-600 dark:text-blue-400 font-medium hover:underline flex items-center gap-1 mt-2 md:mt-0">
            View All <span>→</span>
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[1,2,3,4].map((i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-4 animate-pulse">
                <div className="aspect-square bg-gray-200 dark:bg-gray-700 rounded-xl mb-3"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800">
            <span className="text-6xl mb-4 block">📦</span>
            <p className="text-gray-500 dark:text-gray-400">No products yet. Add some in Supabase!</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {products.map((product) => {
              const discountedPrice = product.discount > 0 
                ? product.price - (product.price * product.discount / 100) 
                : product.price

              return (
                <div key={product.id} className="group">
                  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100/50 dark:border-gray-700/50 h-full flex flex-col overflow-hidden">
                    
                    <Link href={`/products/${product.id}`}>
                      <div className="relative aspect-square bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center p-6 group-hover:scale-105 transition-transform duration-500">
                        <span className="text-7xl">📱</span>
                        
                        {product.discount > 0 && (
                          <span className="absolute top-3 left-3 discount-badge text-white text-xs font-bold px-3 py-1.5 rounded-full z-10">
                            -{product.discount}% OFF
                          </span>
                        )}
                        
                        {product.stock === 0 && (
                          <span className="absolute inset-0 flex items-center justify-center bg-black/60 text-white font-bold text-sm backdrop-blur-sm">
                            Out of Stock
                          </span>
                        )}
                      </div>
                    </Link>

                    <div className="p-4 flex flex-col flex-1">
                      <Link href={`/products/${product.id}`}>
                        <h3 className="font-semibold text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition line-clamp-1 text-sm md:text-base">
                          {product.name}
                        </h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider">
                          {product.brand}
                        </p>
                      </Link>

                      <div className="flex items-center gap-1 mt-1.5">
                        {renderStars(product.rating || 4.5)}
                        <span className="text-[10px] text-gray-400 ml-1">(24)</span>
                      </div>

                      <div className="mt-3 flex items-baseline gap-2">
                        <span className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">
                          Rs. {Math.round(discountedPrice).toLocaleString()}
                        </span>
                        {product.discount > 0 && (
                          <span className="text-xs text-gray-400 line-through">
                            Rs. {product.price.toLocaleString()}
                          </span>
                        )}
                      </div>

                      <div className="mt-2 flex items-center gap-2 text-[10px] font-medium">
                        {product.stock > 0 ? (
                          <>
                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                            <span className="text-green-600 dark:text-green-400">In Stock</span>
                            {product.stock <= 5 && (
                              <span className="text-orange-500 bg-orange-50 dark:bg-orange-900/30 px-2 py-0.5 rounded-full">
                                Only {product.stock} left
                              </span>
                            )}
                          </>
                        ) : (
                          <>
                            <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                            <span className="text-red-500">Out of Stock</span>
                          </>
                        )}
                      </div>

                      {/* ✅ ADD TO CART BUTTON - WORKING */}
                      <button
                        onClick={() => addToCart(product)}
                        className="w-full mt-4 py-2.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-xl font-medium text-sm hover:bg-blue-600 hover:text-white transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </section>
    </div>
  )
}
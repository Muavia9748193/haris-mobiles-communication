'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import { 
  FaStar, FaStarHalfAlt, FaShoppingCart, FaArrowRight, 
  FaShieldAlt, FaTruck, FaLock, FaHeadset 
} from 'react-icons/fa'

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

    for (let i = 0; i < full; i++) stars.push(<FaStar key={i} className="text-yellow-400 text-xs" />)
    if (half) stars.push(<FaStarHalfAlt key="half" className="text-yellow-400 text-xs" />)
    for (let i = stars.length; i < 5; i++) stars.push(<FaStar key={i} className="text-gray-300 text-xs" />)
    return stars
  }

  return (
    <div className="bg-white dark:bg-gray-950">
      
      {/* ============================================================
          PREMIUM HERO SECTION
          ============================================================ */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800"></div>
          <div className="absolute top-[-40%] left-[-20%] w-[800px] h-[800px] bg-blue-400/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-[-40%] right-[-20%] w-[800px] h-[800px] bg-purple-400/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-3xl"></div>
        </div>

        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>

        <div className="container mx-auto px-4 relative z-10 py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-2.5 text-sm font-medium text-white">
                <span className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse"></span>
                🔥 New Collection 2026
              </div>

              {/* Heading */}
              <div>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight text-white">
                  Premium
                  <br />
                  <span className="relative">
                    <span className="relative z-10 bg-gradient-to-r from-yellow-300 via-orange-400 to-pink-400 bg-clip-text text-transparent">
                      Smartphones
                    </span>
                    <span className="absolute -bottom-2 left-0 w-full h-1.5 bg-gradient-to-r from-yellow-300 to-pink-400 rounded-full blur-sm"></span>
                  </span>
                </h1>
                <p className="text-lg text-white/80 max-w-lg mt-4 leading-relaxed">
                  Samsung • Apple • Xiaomi • Vivo — Latest models with exclusive discounts and official warranty.
                </p>
              </div>

              {/* Buttons */}
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/products"
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-gray-900 font-bold rounded-full hover:shadow-2xl hover:shadow-white/20 transition-all duration-300 hover:-translate-y-0.5"
                >
                  Shop Now 
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
                <Link
                  href="/products"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold rounded-full hover:bg-white/20 transition-all duration-300"
                >
                  Explore Deals <span>→</span>
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap items-center gap-8 pt-4">
                <div className="flex items-center gap-3 text-white/80">
                  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                    <FaShieldAlt className="text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">100% Original</p>
                    <p className="text-xs text-white/60">Genuine products</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-white/80">
                  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                    <FaLock className="text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">Secure Checkout</p>
                    <p className="text-xs text-white/60">Encrypted payment</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-white/80">
                  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                    <FaTruck className="text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">Free Delivery</p>
                    <p className="text-xs text-white/60">Pan Pakistan</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right - Floating Phone */}
            <div className="hidden lg:flex justify-center items-center">
              <div className="relative">
                {/* Glow Ring */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-full blur-3xl scale-150 animate-pulse"></div>
                
                {/* Phone Card */}
                <div className="relative w-80 h-80 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-3xl flex items-center justify-center backdrop-blur-md border border-white/20 shadow-2xl shadow-blue-500/20 transform rotate-6 hover:rotate-0 transition-transform duration-700">
                  <span className="text-9xl drop-shadow-2xl">📱</span>
                  
                  {/* Floating Badges */}
                  <div className="absolute -top-6 -right-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full px-5 py-2 text-xs font-bold text-white shadow-lg shadow-orange-500/30 animate-bounce">
                    🔥 HOT
                  </div>
                  <div className="absolute -bottom-6 -left-6 bg-white/10 backdrop-blur-md rounded-2xl px-5 py-3 text-center border border-white/10">
                    <p className="text-lg font-bold text-white">512GB</p>
                    <p className="text-xs text-white/60">Storage</p>
                  </div>
                  <div className="absolute -top-6 -left-6 bg-green-500/20 backdrop-blur-md rounded-full px-4 py-2 text-xs font-semibold text-green-300 border border-green-500/30">
                    ✅ In Stock
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Curved Bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 100" fill="none" className="w-full">
            <path d="M0 50L60 45C120 40 240 30 360 35C480 40 600 60 720 65C840 70 960 60 1080 50C1200 40 1320 30 1380 25L1440 20V100H1380C1320 100 1200 100 1080 100H360C240 100 120 100 60 100H0V50Z" fill="white" className="dark:fill-gray-950"/>
          </svg>
        </div>
      </section>

      {/* ============================================================
          FEATURED PRODUCTS SECTION
          ============================================================ */}
      <section className="container mx-auto px-4 py-20">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-14">
          <div>
            <span className="text-blue-600 dark:text-blue-400 font-semibold text-sm tracking-widest uppercase">
              🔥 Best Sellers
            </span>
            <h2 className="section-title text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mt-2">
              Featured Products
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mt-3 max-w-lg">
              Handpicked premium smartphones just for you
            </p>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold hover:gap-3 transition-all duration-300 group"
          >
            View All 
            <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
          </Link>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[1,2,3,4].map((i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl p-5 animate-pulse shadow-sm">
                <div className="aspect-square bg-gray-200 dark:bg-gray-700 rounded-xl mb-4"></div>
                <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-3"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800">
            <span className="text-7xl mb-4 block">📦</span>
            <p className="text-gray-500 dark:text-gray-400 text-lg font-medium">No products yet</p>
            <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">Add products from admin panel</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {products.map((product) => {
              const discountedPrice = product.discount > 0 
                ? product.price - (product.price * product.discount / 100) 
                : product.price

              return (
                <Link href={`/products/${product.id}`} key={product.id} className="group">
                  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100/50 dark:border-gray-700/50 overflow-hidden">
                    
                    {/* Image */}
                    <div className="relative aspect-square bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center p-6 group-hover:scale-105 transition-transform duration-500 overflow-hidden">
                      <span className="text-7xl">📱</span>
                      
                      {/* Discount Badge */}
                      {product.discount > 0 && (
                        <span className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg shadow-red-500/30 z-10">
                          -{product.discount}% OFF
                        </span>
                      )}
                      
                      {/* Stock Badge */}
                      {product.stock === 0 && (
                        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
                          <span className="text-white font-bold text-sm tracking-wider border border-white/30 px-4 py-2 rounded-lg">
                            OUT OF STOCK
                          </span>
                        </div>
                      )}

                      {/* Quick Action */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all duration-300 flex items-center justify-center">
                        <button className="bg-blue-600 text-white p-3.5 rounded-full shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0 hover:scale-110 hover:bg-blue-700">
                          <FaShoppingCart className="text-sm" />
                        </button>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition line-clamp-1 text-sm md:text-base">
                        {product.name}
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider mt-0.5">
                        {product.brand}
                      </p>

                      {/* Rating */}
                      <div className="flex items-center gap-1 mt-2">
                        {renderStars(product.rating || 4.5)}
                        <span className="text-[10px] text-gray-400 ml-1">(24)</span>
                      </div>

                      {/* Price */}
                      <div className="mt-3 flex items-baseline gap-2">
                        <span className="text-lg font-bold text-gray-900 dark:text-white">
                          Rs. {Math.round(discountedPrice).toLocaleString()}
                        </span>
                        {product.discount > 0 && (
                          <span className="text-xs text-gray-400 line-through">
                            Rs. {product.price.toLocaleString()}
                          </span>
                        )}
                      </div>

                      {/* Stock Status */}
                      <div className="mt-2 flex items-center gap-2">
                        {product.stock > 0 ? (
                          <>
                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                            <span className="text-[11px] font-medium text-green-600">In Stock</span>
                            {product.stock <= 5 && (
                              <span className="text-[10px] text-orange-500 bg-orange-50 dark:bg-orange-900/20 px-2 py-0.5 rounded-full font-medium">
                                {product.stock} left
                              </span>
                            )}
                          </>
                        ) : (
                          <>
                            <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                            <span className="text-[11px] font-medium text-red-500">Out of Stock</span>
                          </>
                        )}
                      </div>

                      {/* Add to Cart Button */}
                      <button className="w-full mt-4 py-2.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-xl font-medium text-sm hover:bg-blue-600 hover:text-white transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </section>

      {/* ============================================================
          CTA BANNER
          ============================================================ */}
      <section className="container mx-auto px-4 pb-20">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 text-white p-12 md:p-16 text-center">
          {/* Background Glow */}
          <div className="absolute inset-0">
            <div className="absolute top-[-50%] left-[-20%] w-[400px] h-[400px] bg-blue-500/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-[-50%] right-[-20%] w-[400px] h-[400px] bg-purple-500/20 rounded-full blur-3xl"></div>
          </div>
          
          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="inline-block px-5 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-6 border border-white/10">
              📱 Limited Time Offer
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
              Get Up to <span className="bg-gradient-to-r from-yellow-300 via-orange-400 to-pink-400 bg-clip-text text-transparent">40% Off</span>
            </h2>
            <p className="text-blue-100/80 mb-8 max-w-lg mx-auto leading-relaxed">
              On premium smartphones and accessories. Don't miss out on these exclusive deals!
            </p>
            <Link
              href="/products"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-gray-900 font-bold rounded-full hover:shadow-2xl hover:shadow-white/20 transition-all duration-300 hover:-translate-y-0.5"
            >
              Shop Now 
              <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================
          STATS SECTION
          ============================================================ */}
      <section className="border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-3xl md:text-4xl font-extrabold text-blue-600">500+</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Happy Customers</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-extrabold text-blue-600">50+</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Brands Available</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-extrabold text-blue-600">1000+</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Products Sold</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-extrabold text-blue-600">4.8⭐</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Customer Rating</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
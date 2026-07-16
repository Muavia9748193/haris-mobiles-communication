import Link from 'next/link'
import { FaWhatsapp, FaFacebook, FaInstagram, FaYoutube, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 border-t border-gray-800">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">H</span>
              </div>
              <h3 className="text-xl font-bold text-white">Haris <span className="text-blue-400">Mobiles</span></h3>
            </div>
            <p className="text-sm text-gray-400 max-w-xs leading-relaxed">
              Main Bazar, Lassan Nawab, Pakistan
            </p>
            <div className="space-y-2 text-sm">
              <p className="flex items-center gap-3">
                <FaPhone className="text-blue-400 text-sm w-4" />
                <span>+92 344 9848193</span>
              </p>
              <p className="flex items-center gap-3">
                <FaEnvelope className="text-blue-400 text-sm w-4" />
                <span>info@harismobiles.com</span>
              </p>
              <p className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-blue-400 text-sm w-4" />
                <span>Lassan Nawab, Pakistan</span>
              </p>
            </div>
            <div className="flex gap-4 pt-2">
              <FaWhatsapp className="text-2xl text-green-500 cursor-pointer hover:scale-110 transition-all duration-300" />
              <FaFacebook className="text-2xl text-blue-600 cursor-pointer hover:scale-110 transition-all duration-300" />
              <FaInstagram className="text-2xl text-pink-600 cursor-pointer hover:scale-110 transition-all duration-300" />
              <FaYoutube className="text-2xl text-red-600 cursor-pointer hover:scale-110 transition-all duration-300" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white text-sm uppercase tracking-wider mb-4">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/products" className="hover:text-blue-400 transition-all hover:translate-x-1 inline-block">All Products</Link></li>
              <li><Link href="/about" className="hover:text-blue-400 transition-all hover:translate-x-1 inline-block">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-blue-400 transition-all hover:translate-x-1 inline-block">Contact</Link></li>
              <li><Link href="/privacy" className="hover:text-blue-400 transition-all hover:translate-x-1 inline-block">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold text-white text-sm uppercase tracking-wider mb-4">Categories</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/products?category=Samsung" className="hover:text-blue-400 transition-all hover:translate-x-1 inline-block">Samsung</Link></li>
              <li><Link href="/products?category=Apple" className="hover:text-blue-400 transition-all hover:translate-x-1 inline-block">Apple</Link></li>
              <li><Link href="/products?category=Xiaomi" className="hover:text-blue-400 transition-all hover:translate-x-1 inline-block">Xiaomi</Link></li>
              <li><Link href="/products?category=Accessories" className="hover:text-blue-400 transition-all hover:translate-x-1 inline-block">Accessories</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold text-white text-sm uppercase tracking-wider mb-4">Newsletter</h4>
            <p className="text-sm text-gray-400 mb-4 leading-relaxed">
              Subscribe to get latest deals & exclusive offers
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2.5 rounded-l-lg bg-gray-800 border border-gray-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-r-lg hover:shadow-lg hover:shadow-blue-500/30 transition-all">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>
            © {new Date().getFullYear()} Haris Mobile Phones & Accessories. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="hover:text-gray-300 cursor-pointer transition">Terms</span>
            <span className="hover:text-gray-300 cursor-pointer transition">Privacy</span>
            <span className="hover:text-gray-300 cursor-pointer transition">Cookies</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
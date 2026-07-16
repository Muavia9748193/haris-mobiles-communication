'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

export default function AddProduct() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    category: '',
    price: '',
    discount: '0',
    stock: '',
    description: '',
    isFeatured: false,
    isNew: false,
  })

  const categories = ['Samsung', 'Apple', 'Vivo', 'Oppo', 'Infinix', 'Tecno', 'Xiaomi', 'Realme', 'Accessories']
  const brands = ['Samsung', 'Apple', 'Vivo', 'Oppo', 'Infinix', 'Tecno', 'Xiaomi', 'Realme', 'OnePlus', 'Google']

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const productData = {
        name: formData.name,
        brand: formData.brand,
        category: formData.category,
        price: parseFloat(formData.price) || 0,
        discount: parseInt(formData.discount) || 0,
        stock: parseInt(formData.stock) || 0,
        description: formData.description,
        isFeatured: formData.isFeatured,
        isNew: formData.isNew,
      }

      const { error } = await supabase
        .from('products')
        .insert([productData])

      if (error) throw error

      router.push('/admin/products')
    } catch (error) {
      console.error('Error:', error)
      alert('Failed to add product')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Link href="/admin/products" className="p-2 hover:bg-gray-100 rounded">← Back</Link>
        <h1 className="text-2xl font-bold">Add Product</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-2xl p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Product Name *</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Brand *</label>
            <select name="brand" value={formData.brand} onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg">
              <option value="">Select Brand</option>
              {brands.map(b => <option key={b} value={b}>{b}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Category *</label>
            <select name="category" value={formData.category} onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg">
              <option value="">Select Category</option>
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Price (Rs.) *</label>
            <input type="number" name="price" value={formData.price} onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Discount (%)</label>
            <input type="number" name="discount" value={formData.discount} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Stock *</label>
            <input type="number" name="stock" value={formData.stock} onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea name="description" value={formData.description} onChange={handleChange} rows={3} className="w-full px-4 py-2 border rounded-lg" />
        </div>

        <div className="flex gap-4">
          <label className="flex items-center gap-2">
            <input type="checkbox" name="isFeatured" checked={formData.isFeatured} onChange={handleChange} />
            Featured
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" name="isNew" checked={formData.isNew} onChange={handleChange} />
            New Arrival
          </label>
        </div>

        <div className="flex gap-4">
          <button type="submit" disabled={loading} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            {loading ? 'Adding...' : 'Add Product'}
          </button>
          <Link href="/admin/products" className="px-6 py-2 bg-gray-200 rounded-lg">Cancel</Link>
        </div>
      </form>
    </div>
  )
}
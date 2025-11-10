"use client"
import { useEffect, useMemo, useState } from 'react'
import AdminShell from '../../components/AdminShell'
import { apiFetch } from '../../lib/api'

const categories = [
  { value: 'Kits', label: 'Kits' },
  { value: 'Components', label: 'Components' },
  { value: 'AddOnModules', label: 'Add-on Modules' },
]

export default function ProductsPage() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [products, setProducts] = useState([])

  const [form, setForm] = useState({
    id: null,
    title: '',
    category: 'Kits',
    price: '',
    stock: 0,
    description: '',
    imagesText: '', // newline-separated URLs
    contentsText: '', // newline-separated items
  })
  const editing = useMemo(() => !!form.id, [form.id])

  const resetForm = () => setForm({
    id: null,
    title: '',
    category: 'Kits',
    price: '',
    stock: 0,
    description: '',
    imagesText: '',
    contentsText: '',
  })

  const fetchProducts = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await apiFetch('/api/admin/products')
      setProducts(res.products || [])
    } catch (e) {
      setError(e.message || 'Failed to load products')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchProducts() }, [])

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    const images = form.imagesText.split(/\r?\n/).map(s => s.trim()).filter(Boolean)
    const contents = form.contentsText.split(/\r?\n/).map(s => s.trim()).filter(Boolean)
    const payload = {
      title: form.title.trim(),
      category: form.category,
      price: Number(form.price),
      stock: Number(form.stock || 0),
      description: form.description?.trim() || null,
      images,
      contents,
    }
    try {
      if (editing) {
        await apiFetch(`/api/admin/products/${form.id}`, {
          method: 'PUT',
          body: JSON.stringify(payload),
        })
      } else {
        await apiFetch('/api/admin/products', {
          method: 'POST',
          body: JSON.stringify(payload),
        })
      }
      resetForm()
      await fetchProducts()
    } catch (e2) {
      setError(e2.message || 'Save failed')
    }
  }

  const onEdit = (p) => {
    setForm({
      id: p.id,
      title: p.title,
      category: p.category,
      price: String(p.price),
      stock: p.stock ?? 0,
      description: p.description ?? '',
      imagesText: (p.images || []).map(i => i.url).join('\n'),
      contentsText: (p.contents || []).map(c => c.item).join('\n'),
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const onDelete = async (id) => {
    if (!confirm('Delete this product?')) return
    setError('')
    try {
      await apiFetch(`/api/admin/products/${id}`, { method: 'DELETE' })
      await fetchProducts()
    } catch (e) {
      setError(e.message || 'Delete failed')
    }
  }

  return (
    <AdminShell title="Products">
      <div className="space-y-6">
        {error ? <div className="rounded-md border border-red-500/30 bg-red-500/10 p-3 text-sm">{error}</div> : null}

        <form onSubmit={onSubmit} className="glass rounded-xl p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-lg font-semibold">{editing ? 'Edit product' : 'Create product'}</div>
            {editing ? <button type="button" onClick={resetForm} className="text-sm underline">Cancel edit</button> : null}
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm mb-1">Title</label>
              <input value={form.title} onChange={e=>setForm({...form,title:e.target.value})} className="w-full rounded-md bg-white/5 border border-white/10 px-3 py-2" required />
            </div>
            <div>
              <label className="block text-sm mb-1">Category</label>
              <select value={form.category} onChange={e=>setForm({...form,category:e.target.value})} className="w-full rounded-md bg-white/5 border border-white/10 px-3 py-2">
                {categories.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm mb-1">Price</label>
              <input type="number" step="0.01" value={form.price} onChange={e=>setForm({...form,price:e.target.value})} className="w-full rounded-md bg-white/5 border border-white/10 px-3 py-2" required />
            </div>
            <div>
              <label className="block text-sm mb-1">Stock</label>
              <input type="number" value={form.stock} onChange={e=>setForm({...form,stock:e.target.value})} className="w-full rounded-md bg-white/5 border border-white/10 px-3 py-2" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm mb-1">Description</label>
              <textarea value={form.description} onChange={e=>setForm({...form,description:e.target.value})} rows={3} className="w-full rounded-md bg-white/5 border border-white/10 px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm mb-1">Image URLs (one per line)</label>
              <textarea value={form.imagesText} onChange={e=>setForm({...form,imagesText:e.target.value})} rows={5} className="w-full rounded-md bg-white/5 border border-white/10 px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm mb-1">Contents (one item per line)</label>
              <textarea value={form.contentsText} onChange={e=>setForm({...form,contentsText:e.target.value})} rows={5} className="w-full rounded-md bg-white/5 border border-white/10 px-3 py-2" />
            </div>
          </div>
          <div className="flex gap-3">
            <button type="submit" className="rounded-md border border-white/10 px-4 py-2 hover:bg-white/5">
              {editing ? 'Update' : 'Create'}
            </button>
          </div>
        </form>

        <div className="glass rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="text-lg font-semibold">Products</div>
            <button className="text-sm underline" onClick={fetchProducts}>Refresh</button>
          </div>
          {loading ? (
            <div className="text-sm text-textWhite/70">Loading…</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-left text-textWhite/70">
                  <tr>
                    <th className="py-2 pr-3">Title</th>
                    <th className="py-2 pr-3">Category</th>
                    <th className="py-2 pr-3">Price</th>
                    <th className="py-2 pr-3">Stock</th>
                    <th className="py-2 pr-3">Images</th>
                    <th className="py-2 pr-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(p => (
                    <tr key={p.id} className="border-t border-white/10 align-top">
                      <td className="py-2 pr-3 font-medium">{p.title}</td>
                      <td className="py-2 pr-3">{p.category}</td>
                      <td className="py-2 pr-3">₹{p.price}</td>
                      <td className="py-2 pr-3">{p.stock}</td>
                      <td className="py-2 pr-3">
                        <div className="flex gap-2 flex-wrap max-w-[360px]">
                          {(p.images||[]).slice(0,4).map((i,idx)=> (
                            <img key={idx} src={i.url} alt="" className="h-10 w-10 object-cover rounded-md border border-white/10" onError={(e)=>{e.currentTarget.style.display='none'}} />
                          ))}
                          {((p.images||[]).length > 4) ? <span className="text-xs text-textWhite/70">+{(p.images||[]).length-4} more</span> : null}
                        </div>
                      </td>
                      <td className="py-2 pr-3">
                        <div className="flex gap-2">
                          <button className="rounded-md border border-white/10 px-3 py-1 hover:bg-white/5" onClick={()=>onEdit(p)}>Edit</button>
                          <button className="rounded-md border border-white/10 px-3 py-1 hover:bg-white/5" onClick={()=>onDelete(p.id)}>Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AdminShell>
  )
}

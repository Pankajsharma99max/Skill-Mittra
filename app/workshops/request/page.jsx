"use client"
import { useState } from 'react'

export default function RequestWorkshop() {
  const [form, setForm] = useState({ schoolName: '', contactName: '', phone: '', city: '' })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const onSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    setError('')
    try {
      const res = await fetch('/api/workshops/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to submit')
      setMessage('Request submitted! We will contact you soon.')
      setForm({ schoolName: '', contactName: '', phone: '', city: '' })
    } catch (e) {
      setError(e.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <h1 className="font-orbitron text-3xl">Request a Workshop</h1>
      <form onSubmit={onSubmit} className="glass rounded-xl p-6 space-y-4">
        <input name="schoolName" value={form.schoolName} onChange={onChange} className="w-full rounded-md bg-white/5 px-3 py-2 outline-none focus:ring-2 focus:ring-neonBlue" placeholder="School Name" required />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input name="contactName" value={form.contactName} onChange={onChange} className="rounded-md bg-white/5 px-3 py-2 outline-none focus:ring-2 focus:ring-neonBlue" placeholder="Contact Name" required />
          <input name="phone" value={form.phone} onChange={onChange} className="rounded-md bg-white/5 px-3 py-2 outline-none focus:ring-2 focus:ring-neonBlue" placeholder="Phone" required />
        </div>
        <input name="city" value={form.city} onChange={onChange} className="w-full rounded-md bg-white/5 px-3 py-2 outline-none focus:ring-2 focus:ring-neonBlue" placeholder="City" required />
        <button disabled={loading} type="submit" className="w-full rounded-md bg-neonBlue px-5 py-2 text-black font-semibold shadow-glow disabled:opacity-60">{loading ? 'Submitting…' : 'Submit Request'}</button>
        {message && <div className="text-green-400">{message}</div>}
        {error && <div className="text-red-400">{error}</div>}
      </form>
    </div>
  )
}

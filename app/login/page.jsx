"use client"
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Login() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Login failed')
      router.push('/admin')
    } catch (e) {
      setError(e.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-sm mx-auto space-y-6">
      <h1 className="font-orbitron text-3xl text-center">Login</h1>
      <form onSubmit={onSubmit} className="glass rounded-xl p-6 space-y-4">
        <input value={email} onChange={(e)=>setEmail(e.target.value)} className="w-full rounded-md bg-white/5 px-3 py-2 outline-none focus:ring-2 focus:ring-neonBlue" placeholder="Email" required />
        <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" className="w-full rounded-md bg-white/5 px-3 py-2 outline-none focus:ring-2 focus:ring-neonBlue" placeholder="Password" required />
        <button disabled={loading} type="submit" className="w-full rounded-md bg-neonBlue px-5 py-2 text-black font-semibold shadow-glow disabled:opacity-60">{loading ? 'Logging in…' : 'Login'}</button>
        {error && <div className="text-red-400">{error}</div>}
      </form>
    </div>
  )
}

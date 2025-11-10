"use client"
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { apiFetch, getToken, setToken } from '../lib/api'

const nav = [
  { href: '/dashboard', label: 'Dashboard', icon: '🏠' },
  { href: '/products', label: 'Products', icon: '📦' },
  { href: '/resources', label: 'Resources', icon: '📚' },
  { href: '/projects', label: 'Projects', icon: '🧰' },
  { href: '/workshops', label: 'Workshops', icon: '🎓' },
  { href: '/orders', label: 'Orders', icon: '🧾' },
  { href: '/users', label: 'Users', icon: '👤' },
]

export default function AdminShell({ children, title = 'Admin' }) {
  const router = useRouter()
  const pathname = usePathname()
  const [status, setStatus] = useState('checking')

  useEffect(() => {
    const token = getToken()
    if (!token) {
      router.replace('/login')
      return
    }
    apiFetch('/api/admin/ping')
      .then(() => setStatus('ok'))
      .catch(() => { setStatus('unauth'); router.replace('/login') })
  }, [router])

  const logout = () => {
    setToken('')
    localStorage.removeItem('ADMIN_TOKEN')
    router.replace('/login')
  }

  if (status === 'checking') {
    return <div className="p-6">Loading…</div>
  }

  return (
    <div className="min-h-screen grid grid-cols-[240px_1fr]">
      <aside className="border-r border-white/10 p-4 sticky top-0 h-screen">
        <div className="mb-6 text-lg font-semibold">Skill Mittra Admin</div>
        <nav className="space-y-1">
          {nav.map(item => (
            <Link key={item.href} href={item.href} className={`block rounded-md px-3 py-2 hover:bg-white/5 ${pathname === item.href ? 'bg-white/10' : ''}`}>
              <span className="mr-2">{item.icon}</span>{item.label}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="p-6">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="font-orbitron text-2xl">{title}</h1>
          <div className="flex items-center gap-3 text-sm">
            <span className="text-textWhite/70 hidden sm:block">{status === 'ok' ? 'Online' : 'Offline'}</span>
            <button onClick={logout} className="rounded-md border border-white/10 px-3 py-1 hover:bg-white/5">Logout</button>
          </div>
        </div>
        {children}
      </main>
    </div>
  )
}

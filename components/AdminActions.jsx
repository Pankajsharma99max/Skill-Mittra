"use client"
import { useRouter } from 'next/navigation'

export default function AdminActions() {
  const router = useRouter()
  const logout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/')
  }
  return (
    <div className="flex items-center justify-end">
      <button onClick={logout} className="rounded-md border border-white/10 px-3 py-1 text-sm hover:bg-white/5">Logout</button>
    </div>
  )
}

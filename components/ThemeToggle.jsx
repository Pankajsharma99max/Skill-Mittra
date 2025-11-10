"use client"
import { useEffect, useState } from 'react'

export default function ThemeToggle({ className = '' }) {
  const [mounted, setMounted] = useState(false)
  const [dark, setDark] = useState(false)

  useEffect(() => {
    setMounted(true)
    try {
      const ls = typeof window !== 'undefined' ? window.localStorage.getItem('theme') : null
      const prefers = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      const isDark = ls ? ls === 'dark' : prefers
      setDark(isDark)
      if (typeof document !== 'undefined') {
        document.documentElement.classList.toggle('dark', isDark)
      }
    } catch (_) {}
  }, [])

  const toggle = () => {
    const next = !dark
    setDark(next)
    try {
      if (typeof document !== 'undefined') {
        document.documentElement.classList.toggle('dark', next)
      }
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('theme', next ? 'dark' : 'light')
      }
    } catch (_) {}
  }

  if (!mounted) return null

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className={`inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm hover:bg-white/5 dark:border-white/10 dark:hover:bg-white/5 border-gray-200 bg-white/60 text-gray-800 ${className}`}
    >
      {dark ? (
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="h-4 w-4">
          <path d="M21.64 13a9 9 0 11-10.63-10.63A7 7 0 1021.64 13z" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-4 w-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364 6.364l-1.414-1.414M7.05 7.05L5.636 5.636m12.728 0l-1.414 1.414M7.05 16.95l-1.414 1.414" />
        </svg>
      )}
      <span className="hidden sm:inline">{dark ? 'Dark' : 'Light'}</span>
    </button>
  )
}

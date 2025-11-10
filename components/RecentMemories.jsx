"use client"
import { useEffect, useState } from 'react'
import GlassCard from './GlassCard'

export default function RecentMemories({ limit = 5 }) {
  const [items, setItems] = useState([])

  useEffect(() => {
    try {
      const raw = typeof window !== 'undefined' ? window.localStorage.getItem('ai_activity') : null
      const parsed = raw ? JSON.parse(raw) : []
      setItems(Array.isArray(parsed) ? parsed.slice(0, limit) : [])
    } catch (_) {
      setItems([])
    }
  }, [limit])

  if (!items.length) return null

  return (
    <section className="space-y-3">
      <h2 className="font-orbitron text-2xl">Previous Memories & Work</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((it, idx) => (
          <GlassCard key={idx}>
            <div className="text-xs text-textWhite/60">{new Date(it.ts).toLocaleString()}</div>
            <div className="mt-1 text-sm"><span className="rounded bg-white/10 px-2 py-0.5">{it.type}</span></div>
            <div className="mt-2 font-semibold">{it.prompt}</div>
            {it.result ? (
              <div className="mt-2 line-clamp-4 text-sm text-textWhite/80 whitespace-pre-wrap">{it.result}</div>
            ) : null}
          </GlassCard>
        ))}
      </div>
    </section>
  )
}

"use client"
import { useEffect, useMemo, useState } from 'react'

// Lightweight faux-3D floating electronics using CSS transforms and SVGs
// No external deps; keeps performance friendly.
export default function FloatingMiniModels({ count = 8, className = '' }) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const items = useMemo(() => {
    const icons = [
      // Resistor
      (
        <svg key="res" viewBox="0 0 64 24" className="h-5 w-10">
          <rect x="0" y="10" width="14" height="4" fill="#bbb"/>
          <rect x="50" y="10" width="14" height="4" fill="#bbb"/>
          <rect x="14" y="6" width="36" height="12" rx="3" fill="#91512b"/>
          <rect x="20" y="6" width="4" height="12" fill="#d4b06a"/>
          <rect x="28" y="6" width="4" height="12" fill="#5a2e91"/>
          <rect x="36" y="6" width="4" height="12" fill="#d43d3d"/>
        </svg>
      ),
      // LED
      (
        <svg key="led" viewBox="0 0 24 24" className="h-6 w-6">
          <circle cx="12" cy="10" r="6" fill="#4C8BFF"/>
          <rect x="7" y="16" width="10" height="2" fill="#bbb"/>
          <rect x="8" y="18" width="8" height="2" fill="#bbb"/>
        </svg>
      ),
      // IC chip
      (
        <svg key="ic" viewBox="0 0 64 32" className="h-6 w-10">
          <rect x="8" y="8" width="48" height="16" rx="3" fill="#1f2937"/>
          {Array.from({length:6}).map((_,i)=>(
            <rect key={i} x={10 + i*8} y="4" width="2" height="6" fill="#9ca3af"/>
          ))}
          {Array.from({length:6}).map((_,i)=>(
            <rect key={'b'+i} x={10 + i*8} y="24" width="2" height="6" fill="#9ca3af"/>
          ))}
        </svg>
      ),
      // Capacitor
      (
        <svg key="cap" viewBox="0 0 32 32" className="h-6 w-6">
          <rect x="10" y="6" width="12" height="16" rx="2" fill="#10b981"/>
          <rect x="15" y="22" width="2" height="6" fill="#bbb"/>
        </svg>
      ),
    ]
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      icon: icons[i % icons.length],
      x: Math.random() * 90 + 5, // vw percent within pad
      y: Math.random() * 60 + 10, // vh percent within pad
      z: Math.random() * 1 + 0.5, // scale depth
      d: Math.random() * 20 + 18, // duration
      r: Math.random() * 360,
    }))
  }, [count])

  if (!mounted) return null

  return (
    <div className={`pointer-events-none absolute inset-0 ${className}`} aria-hidden>
      {items.map(it => (
        <div
          key={it.id}
          className="absolute will-change-transform"
          style={{
            left: `${it.x}%`,
            top: `${it.y}%`,
            transform: `translate(-50%, -50%) perspective(800px) rotateY(${it.r}deg) rotateX(${it.r/2}deg) scale(${it.z})`,
            animation: `floatY ${it.d}s ease-in-out ${it.id * 0.7}s infinite alternate, spinY ${it.d*2}s linear infinite`,
            opacity: 0.85,
            filter: 'drop-shadow(0 0 8px rgba(76,139,255,0.35))',
          }}
        >
          {it.icon}
        </div>
      ))}
      <style jsx>{`
        @keyframes floatY {
          0% { transform: translate(-50%, -50%) translateY(-8px); }
          100% { transform: translate(-50%, -50%) translateY(8px); }
        }
        @keyframes spinY {
          0% { transform: rotateY(0deg); }
          100% { transform: rotateY(360deg); }
        }
      `}</style>
    </div>
  )
}

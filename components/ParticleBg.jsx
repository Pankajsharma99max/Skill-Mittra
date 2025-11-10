"use client"
import { useEffect, useRef } from 'react'

export default function ParticleBg({ className = '' }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    const state = { w: 0, h: 0, dpr: 1 }

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      const width = window.innerWidth
      const height = 300
      canvas.style.width = width + 'px'
      canvas.style.height = height + 'px'
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      state.w = width
      state.h = height
      state.dpr = dpr
    }
    resize()

    const particles = Array.from({ length: 60 }).map(() => ({
      x: Math.random() * state.w,
      y: Math.random() * state.h,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      r: 1 + Math.random() * 2,
    }))

    let raf
    const render = () => {
      ctx.fillStyle = '#0A0F1F'
      ctx.fillRect(0, 0, state.w, state.h)
      particles.forEach(p => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > state.w) p.vx *= -1
        if (p.y < 0 || p.y > state.h) p.vy *= -1
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(76,139,255,0.8)'
        ctx.shadowColor = 'rgba(160,32,240,0.5)'
        ctx.shadowBlur = 8
        ctx.fill()
      })
      raf = requestAnimationFrame(render)
    }
    render()
    window.addEventListener('resize', resize)
    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(raf)
    }
  }, [])

  return <canvas ref={canvasRef} className={`w-full ${className}`} />
}

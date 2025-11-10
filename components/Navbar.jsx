"use client"
import Link from 'next/link'
import { useState } from 'react'
import ThemeToggle from './ThemeToggle'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0A0F1F]/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <Link href="/" className="font-orbitron text-xl text-white">
          <span className="text-neonBlue">Skill</span> <span className="text-neonPurple">Mittra</span>
        </Link>
        <button
          className="md:hidden inline-flex items-center justify-center rounded-md border border-white/10 p-2 text-textWhite/90 hover:bg-white/5"
          aria-label="Toggle menu"
          onClick={() => setOpen(v => !v)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
          </svg>
        </button>
        <nav className="hidden md:flex items-center gap-5 text-sm text-textWhite/90">
          <Link className="hover:text-white" href="/">Home</Link>
          <Link className="hover:text-white" href="/shop">Shop</Link>
          <Link className="hover:text-white" href="/learning-hub">Learning Hub</Link>
          <Link className="hover:text-white" href="/project-library">Projects</Link>
          <Link className="hover:text-white" href="/workshops">Workshops</Link>
          <Link className="hover:text-white" href="/about">About</Link>
          <Link className="hover:text-white" href="/contact">Contact</Link>
          <Link className="hover:text-white" href="/login">Login</Link>
          <Link className="rounded-md bg-neonBlue/20 px-3 py-1 text-neonBlue shadow-glow hover:bg-neonBlue/30" href="/signup">Signup</Link>
          <ThemeToggle className="ml-2" />
        </nav>
      </div>
      {open && (
        <div className="md:hidden border-t border-white/10 bg-[#0A0F1F]/95">
          <nav className="mx-auto max-w-7xl px-4 py-3 grid gap-2 text-sm">
            <Link onClick={() => setOpen(false)} className="rounded-md px-3 py-2 hover:bg-white/5" href="/">Home</Link>
            <Link onClick={() => setOpen(false)} className="rounded-md px-3 py-2 hover:bg-white/5" href="/shop">Shop</Link>
            <Link onClick={() => setOpen(false)} className="rounded-md px-3 py-2 hover:bg-white/5" href="/learning-hub">Learning Hub</Link>
            <Link onClick={() => setOpen(false)} className="rounded-md px-3 py-2 hover:bg-white/5" href="/project-library">Projects</Link>
            <Link onClick={() => setOpen(false)} className="rounded-md px-3 py-2 hover:bg-white/5" href="/workshops">Workshops</Link>
            <Link onClick={() => setOpen(false)} className="rounded-md px-3 py-2 hover:bg-white/5" href="/about">About</Link>
            <Link onClick={() => setOpen(false)} className="rounded-md px-3 py-2 hover:bg-white/5" href="/contact">Contact</Link>
            <div className="mt-2 flex gap-2">
              <Link onClick={() => setOpen(false)} className="flex-1 rounded-md border border-white/10 px-3 py-2 text-center" href="/login">Login</Link>
              <Link onClick={() => setOpen(false)} className="flex-1 rounded-md bg-neonBlue px-3 py-2 text-center text-black font-semibold" href="/signup">Signup</Link>
            </div>
            <div className="mt-2">
              <ThemeToggle className="w-full justify-center" />
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}

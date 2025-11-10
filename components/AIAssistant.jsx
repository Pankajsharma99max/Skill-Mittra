"use client"
import { useState } from 'react'

const TYPES = [
  { value: 'components', label: 'Components' },
  { value: 'kits', label: 'Kits' },
  { value: 'addons', label: 'Add-On Modules' },
  { value: 'learning', label: 'Learning Path' },
  { value: 'general', label: 'General' },
]

export default function AIAssistant() {
  const [open, setOpen] = useState(false)
  const [type, setType] = useState('components')
  const [typeOpen, setTypeOpen] = useState(false)
  const [prompt, setPrompt] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState('')
  const [error, setError] = useState('')

  const ask = async () => {
    if (!prompt.trim()) return
    setLoading(true)
    setError('')
    setResult('')
    const saveActivity = (entry) => {
      try {
        if (typeof window === 'undefined') return
        const raw = window.localStorage.getItem('ai_activity')
        const arr = raw ? JSON.parse(raw) : []
        const next = [entry, ...((Array.isArray(arr) ? arr : []).slice(0, 49))]
        window.localStorage.setItem('ai_activity', JSON.stringify(next))
      } catch (_) {}
    }
    try {
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, type }),
      })
      const ct = res.headers.get('content-type') || ''
      if (!res.ok) {
        const err = ct.includes('application/json') ? await res.json() : { error: 'AI error' }
        const raw = err.error || 'AI error'
        // map common server errors to user-friendly messages
        const friendly = raw.includes('AI_API_KEY not configured')
          ? 'AI is not configured on the server. Ask the site admin to set AI_API_KEY in .env.local and restart.'
          : raw
        throw new Error(friendly)
      }
      if (res.body && ct.startsWith('text/plain')) {
        const reader = res.body.getReader()
        const decoder = new TextDecoder()
        let buffer = ''
        let all = ''
        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          buffer = decoder.decode(value, { stream: true })
          all += buffer
          setResult(prev => prev + buffer)
        }
        saveActivity({ ts: Date.now(), type, prompt, result: all })
      } else {
        const data = await res.json()
        setResult(data.suggestions || '')
        saveActivity({ ts: Date.now(), type, prompt, result: data.suggestions || '' })
      }
    } catch (e) {
      setError(e.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed bottom-5 right-5 z-[60]">
      {!open && (
        <button
          className="rounded-full bg-neonPurple p-3 text-white shadow-glowPurple hover:opacity-90"
          aria-label="Open AI Assistant"
          onClick={() => setOpen(true)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
            <path d="M12 2a7 7 0 00-7 7v1.126a3 3 0 00-.879 2.12V16a3 3 0 003 3h1v-4H7v-1.754a1 1 0 01.293-.707L8 11.833V9a4 4 0 118 0v2.833l.707.706A1 1 0 0117 14.246V16h-1v4h1a3 3 0 003-3v-3.754a3 3 0 00-.879-2.12V9a7 7 0 00-7-7z" />
          </svg>
        </button>
      )}
      {open && (
        <div className="w-[92vw] max-w-md glass rounded-xl border border-white/10 p-4 text-sm">
          <div className="mb-2 flex items-center justify-between">
            <div className="font-orbitron">AI Assistant</div>
            <button
              className="rounded-md border border-white/10 px-2 py-1 hover:bg-white/5"
              onClick={() => setOpen(false)}
            >Close</button>
          </div>
          <div className="mb-2 grid grid-cols-2 gap-2">
            <div className="col-span-2 relative">
              <button
                type="button"
                onClick={() => setTypeOpen(v => !v)}
                aria-haspopup="listbox"
                aria-expanded={typeOpen}
                className="w-full rounded-md px-3 py-2 text-left font-orbitron transition-colors
                bg-white/60 text-gray-900 border border-gray-300 hover:bg-white/70 focus:ring-2 focus:ring-neonBlue
                dark:bg-black/40 dark:text-neonBlue dark:border-white/10 dark:hover:bg-black/50"
              >
                <span className="inline-flex items-center gap-2">
                  <span>{TYPES.find(t => t.value === type)?.label || 'Select type'}</span>
                  <svg className="ml-auto h-4 w-4 opacity-70" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M6 9l6 6 6-6"/></svg>
                </span>
              </button>
              {typeOpen && (
                <div className="absolute z-10 bottom-full mb-1 w-full overflow-hidden rounded-md border
                border-gray-300 bg-white/90 text-gray-900 shadow-md backdrop-blur-sm
                dark:border-white/10 dark:bg-black/80 dark:text-textWhite">
                  <ul role="listbox" className="max-h-[40vh] overflow-auto overscroll-contain py-1 text-sm">
                    {TYPES.map(t => (
                      <li key={t.value}>
                        <button
                          type="button"
                          onClick={() => { setType(t.value); setTypeOpen(false) }}
                          role="option"
                          aria-selected={type === t.value}
                          className={`group flex w-full items-center px-3 py-2 text-left transition-colors
                          hover:bg-white/60 hover:text-gray-900 dark:hover:bg-white/10
                          ${type === t.value
                            ? 'bg-neonBlue/20 border-l-2 border-neonBlue font-semibold text-neonBlue dark:text-neonBlue'
                            : 'border-l-2 border-transparent'}
                          `}
                        >
                          <span className="flex-1">{t.label}</span>
                          {type === t.value && (
                            <svg className="ml-2 h-4 w-4 text-neonBlue" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M20 6L9 17l-5-5"/></svg>
                          )}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
          <textarea
            rows={3}
            className="mb-2 w-full rounded-md bg-white/5 px-3 py-2 outline-none focus:ring-2 focus:ring-neonBlue"
            placeholder="Describe your goal, budget, boards, sensors, etc."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <button
            disabled={loading}
            onClick={ask}
            className="w-full rounded-md bg-neonBlue px-4 py-2 font-semibold text-black disabled:opacity-60"
          >{loading ? 'Thinking…' : 'Get Suggestions'}</button>
          {error && <div className="mt-2 text-red-400">{error}</div>}
          {result && (
            <div className="mt-3 whitespace-pre-wrap rounded-md border border-white/10 bg-black/20 p-3 text-textWhite/90">
              {result}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

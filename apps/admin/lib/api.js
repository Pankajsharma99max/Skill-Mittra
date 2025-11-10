export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000'

export function getToken() {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('ADMIN_TOKEN')
}

export function setToken(token) {
  if (typeof window === 'undefined') return
  localStorage.setItem('ADMIN_TOKEN', token)
}

export async function apiFetch(path, options = {}) {
  const token = getToken()
  const headers = new Headers(options.headers || {})
  const isFormData = typeof FormData !== 'undefined' && options.body instanceof FormData
  if (token) headers.set('Authorization', `Bearer ${token}`)
  if (!headers.has('Content-Type') && options.body && !isFormData) headers.set('Content-Type', 'application/json')
  const res = await fetch(`${API_BASE_URL}${path}`, { ...options, headers })
  if (!res.ok) {
    let msg = 'Request failed'
    try { const data = await res.json(); msg = data.error || msg } catch {}
    throw new Error(msg)
  }
  return res.json()
}

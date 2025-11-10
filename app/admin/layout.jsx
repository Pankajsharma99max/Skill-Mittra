import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { verifyToken } from '../../lib/auth'

export default function AdminLayout({ children }) {
  const cookieStore = cookies()
  const token = cookieStore.get('AUTH_TOKEN')?.value
  const payload = token ? verifyToken(token) : null
  const role = payload?.role
  if (!role || (role !== 'Admin' && role !== 'SuperAdmin')) {
    redirect('/login')
  }
  return (
    <section>
      {children}
    </section>
  )
}

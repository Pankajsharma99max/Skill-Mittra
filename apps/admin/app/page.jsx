import Link from 'next/link'

export default function Home() {
  return (
    <div className="space-y-4">
      <h1 className="font-orbitron text-3xl">Admin</h1>
      <p>Go to <Link className="text-neonBlue underline" href="/login">Login</Link> or <Link className="text-neonBlue underline" href="/dashboard">Dashboard</Link>.</p>
    </div>
  )
}

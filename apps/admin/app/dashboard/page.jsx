"use client"
import { useEffect, useState } from 'react'
import { apiFetch } from '../../lib/api'
import AdminShell from '../../components/AdminShell'

export default function AdminDashboard() {
  const [status, setStatus] = useState('Checking…')

  useEffect(() => {
    apiFetch('/api/admin/ping')
      .then(() => setStatus('OK'))
      .catch((e) => setStatus('Auth required: ' + e.message))
  }, [])

  return (
    <AdminShell title="Dashboard">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="text-sm text-textWhite/70">API: {status}</div>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="glass rounded-xl p-4">
            <div className="text-sm text-textWhite/70">Sales</div>
            <div className="text-2xl font-bold">₹0</div>
          </div>
          <div className="glass rounded-xl p-4">
            <div className="text-sm text-textWhite/70">Visits</div>
            <div className="text-2xl font-bold">0</div>
          </div>
          <div className="glass rounded-xl p-4">
            <div className="text-sm text-textWhite/70">Workshop Requests</div>
            <div className="text-2xl font-bold">0</div>
          </div>
        </div>
      </div>
    </AdminShell>
  )
}

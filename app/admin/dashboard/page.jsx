import AdminActions from '../../../components/AdminActions'

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <AdminActions />
      <h1 className="font-orbitron text-3xl">Dashboard</h1>
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
  )
}

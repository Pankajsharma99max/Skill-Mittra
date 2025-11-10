import Link from 'next/link'

export default function AdminIndex() {
  const links = [
    {href:'/admin/dashboard', label:'Dashboard'},
    {href:'/admin/products', label:'Products'},
    {href:'/admin/kits-designer', label:'Kits Designer'},
    {href:'/admin/resources', label:'Resources Library'},
    {href:'/admin/project-library', label:'Project Library Manager'},
    {href:'/admin/workshops', label:'Workshop Manager'},
    {href:'/admin/orders', label:'Orders'},
    {href:'/admin/settings', label:'Settings'},
  ]
  return (
    <div className="space-y-4">
      <h1 className="font-orbitron text-3xl">Admin</h1>
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {links.map(l => (
          <li key={l.href}>
            <Link className="block rounded-md border border-white/10 p-4 hover:bg-white/5" href={l.href}>{l.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

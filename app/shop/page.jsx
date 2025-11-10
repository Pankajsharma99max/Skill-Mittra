import GlassCard from "../../components/GlassCard"

export default function ShopPage() {
  const categories = ["Kits","Components","Add-On Modules"]
  const items = [
    { title: 'Starter Robotics Kit', price: 999 },
    { title: 'Sensor Pack', price: 1299 },
    { title: 'Motor Driver Board', price: 1499 },
    { title: 'Jumper Wires Set', price: 799 },
    { title: 'Smart IoT Kit', price: 1999 },
    { title: 'Advanced Robotics Kit', price: 2499 },
  ]
  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden rounded-2xl border border-white/10 p-6">
        <h1 className="font-orbitron text-3xl">Shop</h1>
      </div>
      <div className="flex gap-3">
        {categories.map(c => (
          <button key={c} className="rounded-md border border-white/20 px-4 py-1 text-sm hover:bg-white/5">{c}</button>
        ))}
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((it,i) => (
          <GlassCard key={i}>
            <div className="h-36 rounded-md bg-white/5" />
            <div className="mt-3 font-semibold">{it.title}</div>
            <div className="text-sm text-textWhite/70">Short description here.</div>
            <div className="mt-3 flex items-center justify-between">
              <div className="font-orbitron text-neonBlue">₹{it.price.toLocaleString()}</div>
              <button className="rounded-md border border-white/20 px-3 py-1 text-sm hover:bg-white/5">Add to Cart</button>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  )
}

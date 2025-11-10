import prisma from '../../lib/prisma'

function formatPrice(p) {
  try { return `₹${Number(p).toFixed(2)}` } catch { return `₹${p}` }
}

export default async function ProductsPublicPage() {
  const products = await prisma.product.findMany({
    orderBy: { id: 'desc' },
    include: { images: true }
  })

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Products</h1>
      {products.length === 0 ? (
        <div className="text-textWhite/70">No products yet.</div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {products.map((p) => {
            const thumb = p.images?.[0]?.url
            return (
              <div key={p.id.toString()} className="glass rounded-xl overflow-hidden">
                {thumb ? (
                  <img src={thumb} alt="" className="h-40 w-full object-cover border-b border-white/10" onError={(e)=>{e.currentTarget.style.display='none'}} />
                ) : null}
                <div className="p-4 space-y-1">
                  <div className="font-semibold">{p.title}</div>
                  <div className="text-sm text-textWhite/70">{p.category}</div>
                  <div className="text-sm">{formatPrice(p.price)}</div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

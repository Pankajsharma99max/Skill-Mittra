import prisma from '../../../lib/prisma'

function sProduct(p) {
  return {
    ...p,
    id: p.id?.toString(),
    images: (p.images || []).map((img) => ({ ...img, id: img.id?.toString(), productId: img.productId?.toString() })),
    contents: (p.contents || []).map((c) => ({ ...c, id: c.id?.toString(), productId: c.productId?.toString() })),
  }
}

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { id: 'desc' },
      include: { images: true, contents: true },
    })
    const data = products.map(sProduct)
    return new Response(JSON.stringify({ ok: true, products: data }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (e) {
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500, headers: { 'Content-Type': 'application/json' } })
  }
}

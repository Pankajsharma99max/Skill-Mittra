import prisma from '../../../../lib/prisma'
import { verifyToken } from '../../../../lib/auth'

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': process.env.NEXT_PUBLIC_ADMIN_ORIGIN || '*',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Max-Age': '86400',
  }
}

function requireAdmin(req) {
  const auth = req.headers.get('authorization') || ''
  const [, token] = auth.split(' ')
  const payload = token ? verifyToken(token) : null
  const role = payload?.role
  if (!role || (role !== 'Admin' && role !== 'SuperAdmin')) {
    return null
  }
  return payload
}

function sProduct(p) {
  return {
    ...p,
    id: p.id?.toString(),
    images: (p.images || []).map((img) => ({ ...img, id: img.id?.toString(), productId: img.productId?.toString() })),
    contents: (p.contents || []).map((c) => ({ ...c, id: c.id?.toString(), productId: c.productId?.toString() })),
  }
}

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: corsHeaders() })
}

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { id: 'desc' },
      include: { images: true, contents: true },
    })
    const data = products.map(sProduct)
    return new Response(JSON.stringify({ ok: true, products: data }), { status: 200, headers: { 'Content-Type': 'application/json', ...corsHeaders() } })
  } catch (e) {
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500, headers: corsHeaders() })
  }
}

export async function POST(req) {
  try {
    const user = requireAdmin(req)
    if (!user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: corsHeaders() })
    }
    const body = await req.json()
    const { title, category, price, stock = 0, description = null, images = [], contents = [] } = body
    if (!title || !category || price == null) {
      return new Response(JSON.stringify({ error: 'Missing fields' }), { status: 400, headers: corsHeaders() })
    }

    const product = await prisma.product.create({
      data: {
        title,
        category,
        price,
        stock,
        description,
        images: { create: (images || []).map((url) => ({ url })) },
        contents: { create: (contents || []).map((item) => ({ item })) },
      },
      include: { images: true, contents: true },
    })
    return new Response(JSON.stringify({ ok: true, product: sProduct(product) }), { status: 201, headers: { 'Content-Type': 'application/json', ...corsHeaders() } })
  } catch (e) {
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500, headers: corsHeaders() })
  }
}

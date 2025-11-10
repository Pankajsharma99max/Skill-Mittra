import prisma from '../../../../../lib/prisma'
import { verifyToken } from '../../../../../lib/auth'

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': process.env.NEXT_PUBLIC_ADMIN_ORIGIN || '*',
    'Access-Control-Allow-Methods': 'GET,PUT,DELETE,OPTIONS',
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

export async function GET(_req, { params }) {
  try {
    const id = BigInt(params.id)
    const product = await prisma.product.findUnique({ where: { id }, include: { images: true, contents: true } })
    if (!product) return new Response(JSON.stringify({ error: 'Not found' }), { status: 404, headers: corsHeaders() })
    return new Response(JSON.stringify({ ok: true, product: sProduct(product) }), { status: 200, headers: { 'Content-Type': 'application/json', ...corsHeaders() } })
  } catch (e) {
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders() } })
  }
}

export async function PUT(req, { params }) {
  try {
    const user = requireAdmin(req)
    if (!user) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: corsHeaders() })
    const id = BigInt(params.id)
    const body = await req.json()
    const { title, category, price, stock, description, images = [], contents = [] } = body
    const product = await prisma.product.update({
      where: { id },
      data: {
        ...(title != null ? { title } : {}),
        ...(category != null ? { category } : {}),
        ...(price != null ? { price } : {}),
        ...(stock != null ? { stock } : {}),
        ...(description !== undefined ? { description } : {}),
        images: images ? { deleteMany: {}, create: images.map((url) => ({ url })) } : undefined,
        contents: contents ? { deleteMany: {}, create: contents.map((item) => ({ item })) } : undefined,
      },
      include: { images: true, contents: true },
    })
    return new Response(JSON.stringify({ ok: true, product: sProduct(product) }), { status: 200, headers: { 'Content-Type': 'application/json', ...corsHeaders() } })
  } catch (e) {
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders() } })
  }
}

export async function DELETE(req, { params }) {
  try {
    const user = requireAdmin(req)
    if (!user) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: corsHeaders() })
    const id = BigInt(params.id)
    await prisma.product.delete({ where: { id } })
    return new Response(JSON.stringify({ ok: true }), { status: 200, headers: { 'Content-Type': 'application/json', ...corsHeaders() } })
  } catch (e) {
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders() } })
  }
}

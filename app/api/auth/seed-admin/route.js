import prisma from '../../../../lib/prisma'
import { hashPassword } from '../../../../lib/auth'

export async function POST(req) {
  try {
    const token = req.headers.get('x-seed-token')
    if (!token || token !== process.env.ADMIN_SEED_TOKEN) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
    }
    const { email, name = 'Admin', password } = await req.json()
    if (!email || !password) {
      return new Response(JSON.stringify({ error: 'email and password required' }), { status: 400 })
    }

    const passwordHash = await hashPassword(password)

    const user = await prisma.user.upsert({
      where: { email },
      update: { role: 'Admin', passwordHash },
      create: { name, email, passwordHash, role: 'Admin' },
      select: { id: true }
    })

    const id = user.id?.toString()
    return new Response(
      JSON.stringify({ ok: true, id }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    )
  } catch (e) {
    try { console.error('seed-admin error', e) } catch {}
    return new Response(
      JSON.stringify({ error: 'Server error', code: e?.code || null, message: e?.message || null }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}


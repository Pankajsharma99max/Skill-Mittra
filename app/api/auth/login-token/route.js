import prisma from '../../../../lib/prisma'
import { comparePassword, signToken } from '../../../../lib/auth'

export async function POST(req) {
  try {
    const { email, password } = await req.json()
    if (!email || !password) {
      return new Response(JSON.stringify({ error: 'Email and password required' }), { status: 400, headers: corsHeaders() })
    }

    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      return new Response(JSON.stringify({ error: 'Invalid credentials' }), { status: 401, headers: corsHeaders() })
    }

    const ok = await comparePassword(password, user.passwordHash)
    if (!ok) {
      return new Response(JSON.stringify({ error: 'Invalid credentials' }), { status: 401 })
    }

    const token = signToken({ sub: String(user.id), role: user.role, email: user.email })

    return new Response(JSON.stringify({ ok: true, token, role: user.role }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders() },
    })
  } catch (e) {
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500, headers: corsHeaders() })
  }
}

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: corsHeaders() })
}

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': process.env.NEXT_PUBLIC_ADMIN_ORIGIN || '*',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Max-Age': '86400',
  }
}

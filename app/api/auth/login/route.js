import prisma from '../../../../lib/prisma'
import { comparePassword, signToken } from '../../../../lib/auth'

export async function POST(req) {
  try {
    const { email, password } = await req.json()
    if (!email || !password) {
      return new Response(JSON.stringify({ error: 'Email and password required' }), { status: 400 })
    }

    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      return new Response(JSON.stringify({ error: 'Invalid credentials' }), { status: 401 })
    }

    const ok = await comparePassword(password, user.passwordHash)
    if (!ok) {
      return new Response(JSON.stringify({ error: 'Invalid credentials' }), { status: 401 })
    }

    const token = signToken({ sub: String(user.id), role: user.role, email: user.email })

    const cookie = [
      'AUTH_TOKEN=' + token,
      'HttpOnly',
      'Path=/',
      `Max-Age=${60 * 60 * 24 * 7}`,
      process.env.NODE_ENV === 'production' ? 'Secure' : '',
      'SameSite=Lax',
    ].filter(Boolean).join('; ')

    return new Response(JSON.stringify({ ok: true, role: user.role }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Set-Cookie': cookie,
      },
    })
  } catch (e) {
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 })
  }
}

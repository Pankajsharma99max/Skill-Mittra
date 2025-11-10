import { verifyToken } from '../../../../lib/auth'

export async function GET(req) {
  try {
    const auth = req.headers.get('authorization') || ''
    const [, token] = auth.split(' ')
    const payload = token ? verifyToken(token) : null
    const role = payload?.role
    if (!role || (role !== 'Admin' && role !== 'SuperAdmin')) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: corsHeaders() })
    }
    return new Response(JSON.stringify({ ok: true, role }), { status: 200, headers: { 'Content-Type': 'application/json', ...corsHeaders() } })
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

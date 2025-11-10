export async function POST() {
  const expired = [
    'AUTH_TOKEN=deleted',
    'HttpOnly',
    'Path=/',
    'Max-Age=0',
    'SameSite=Lax',
  ].join('; ')
  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Set-Cookie': expired,
    },
  })
}

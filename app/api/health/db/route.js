import prisma from '../../../../lib/prisma'

export async function GET() {
  try {
    // Run a trivial query to check connectivity
    await prisma.$queryRaw`SELECT 1`
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (e) {
    return new Response(JSON.stringify({ ok: false, error: 'DB connect failed' }), { status: 500 })
  }
}

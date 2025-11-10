import prisma from '../../../../lib/prisma'

export async function POST(req) {
  try {
    const { schoolName, contactName, phone, city } = await req.json()
    if (!schoolName || !contactName || !phone || !city) {
      return new Response(JSON.stringify({ error: 'All fields are required' }), { status: 400 })
    }

    const doc = await prisma.workshopRequest.create({
      data: { schoolName, contactName, phone, city },
      select: { id: true },
    })

    return new Response(JSON.stringify({ ok: true, id: doc.id }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (e) {
    console.error('Workshop request error', e)
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 })
  }
}

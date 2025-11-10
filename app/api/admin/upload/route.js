import { v2 as cloudinary } from 'cloudinary'
import { verifyToken } from '../../../../lib/auth'

export const runtime = 'nodejs'

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': process.env.NEXT_PUBLIC_ADMIN_ORIGIN || '*',
    'Access-Control-Allow-Methods': 'POST,OPTIONS',
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

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: corsHeaders() })
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
})

export async function POST(req) {
  try {
    const user = requireAdmin(req)
    if (!user) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: corsHeaders() })

    const form = await req.formData()
    const file = form.get('file')
    if (!file || typeof file === 'string') {
      return new Response(JSON.stringify({ error: 'Missing file' }), { status: 400, headers: corsHeaders() })
    }

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    const folder = process.env.CLOUDINARY_FOLDER || 'skill-mittra/products'

    const url = await new Promise((resolve, reject) => {
      const upload = cloudinary.uploader.upload_stream(
        { folder, resource_type: 'image' },
        (err, result) => {
          if (err) return reject(err)
          resolve(result.secure_url)
        }
      )
      upload.end(buffer)
    })

    return new Response(JSON.stringify({ ok: true, url }), { status: 201, headers: { 'Content-Type': 'application/json', ...corsHeaders() } })
  } catch (e) {
    try { console.error('upload error', e) } catch {}
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders() } })
  }
}

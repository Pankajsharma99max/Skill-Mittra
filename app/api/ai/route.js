export async function POST(req) {
  try {
    const body = await req.json()
    const { prompt, type = 'general' } = body || {}
    if (!prompt) {
      return new Response(JSON.stringify({ error: 'Missing prompt' }), { status: 400 })
    }

    const API_KEY = process.env.AI_API_KEY
    const BASE_URL = process.env.AI_BASE_URL || 'https://api.openai.com/v1'
    const MODEL = process.env.AI_MODEL || 'gpt-4o-mini'

    if (!API_KEY) {
      return new Response(JSON.stringify({ error: 'AI_API_KEY not configured' }), { status: 500 })
    }

    const payload = {
      model: MODEL,
      temperature: 1,
      max_completion_tokens: 8192,
      top_p: 1,
      stream: true,
      reasoning_effort: 'medium',
      stop: null,
      messages: [
        {
          role: 'system',
          content:
            "You are Skill Mittra's assistant. Suggest electronics components, robotics kits, add-on modules, and learning paths. Be concise, return actionable items with short justifications."
        },
        {
          role: 'user',
          content: `Type: ${type}\nRequest: ${prompt}`,
        },
      ],
    }

    const upstream = await fetch(`${BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify(payload),
    })

    if (!upstream.ok || !upstream.body) {
      const text = await upstream.text().catch(() => '')
      return new Response(JSON.stringify({ error: 'AI provider error', detail: text }), { status: 500 })
    }

    const encoder = new TextEncoder()
    const decoder = new TextDecoder()

    const stream = new ReadableStream({
      async start(controller) {
        const reader = upstream.body.getReader()
        let buffer = ''
        try {
          while (true) {
            const { done, value } = await reader.read()
            if (done) break
            buffer += decoder.decode(value, { stream: true })
            const parts = buffer.split('\n')
            buffer = parts.pop() || ''
            for (const line of parts) {
              const trimmed = line.trim()
              if (!trimmed.startsWith('data:')) continue
              const data = trimmed.slice(5).trim()
              if (!data || data === '[DONE]') continue
              try {
                const json = JSON.parse(data)
                const delta = json?.choices?.[0]?.delta?.content
                if (delta) controller.enqueue(encoder.encode(delta))
              } catch (_) {
                // ignore parse errors on keepalive chunks
              }
            }
          }
        } catch (err) {
          controller.error(err)
          return
        }
        controller.close()
      },
    })

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
      },
    })
  } catch (e) {
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 })
  }
}

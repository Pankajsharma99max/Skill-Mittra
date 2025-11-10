const PROVIDER = process.env.AI_PROVIDER || 'openai'
const API_KEY = process.env.AI_API_KEY
const BASE_URL = process.env.AI_BASE_URL || 'https://api.openai.com/v1'
const MODEL = process.env.AI_MODEL || 'gpt-4o-mini'

if (!API_KEY) {
  console.warn('AI_API_KEY is not set. AI suggestions will be disabled until you configure it.')
}

export async function aiSuggest({ prompt, type = 'general' }) {
  if (!API_KEY) return { suggestions: [], note: 'AI disabled: missing API key' }

  // OpenAI-compatible Chat Completions payload
  const body = {
    model: MODEL,
    messages: [
      {
        role: 'system',
        content:
          'You are Skill Mittra\'s assistant. Suggest electronics components, robotics kits, and learning paths. Be concise, list items with short justifications, and reference categories: Kits, Components, Add-On Modules, Arduino Basics, Robotics Projects, IoT Projects. Prefer beginner-friendly options when unclear.'
      },
      {
        role: 'user',
        content: `Type: ${type}\nRequest: ${prompt}`
      }
    ],
    temperature: 0.4,
  }

  const res = await fetch(`${BASE_URL}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const text = await res.text()
    console.error('AI error:', res.status, text)
    return { suggestions: [], error: 'AI provider error' }
  }

  const data = await res.json()
  const content = data?.choices?.[0]?.message?.content || ''

  return { suggestions: content }
}

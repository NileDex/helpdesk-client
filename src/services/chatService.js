const API_URL = import.meta.env.VITE_API_URL

export async function processMessage(userText) {
  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: userText }),
    })

    if (!res.ok) throw new Error(`Server error: ${res.status}`)

    return await res.json()
  } catch {
    return {
      intent: 'error',
      confidence: 0,
      response: "Sorry, I am currently unavailable. Please try again in a moment or contact the university directly.\n\n**RSU Contact:** info@rsu.edu.ng | +234 810 444 4411\n**Website:** https://www.rsu.edu.ng",
      suggestions: ['Try again', 'What are the school fees?', 'Tell me about admission'],
    }
  }
}

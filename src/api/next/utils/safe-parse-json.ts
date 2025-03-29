export async function safeParseJson(response: Response) {
  const text = await response.text()
  return text ? JSON.parse(text) : null
}


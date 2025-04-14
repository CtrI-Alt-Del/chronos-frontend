export async function safeParseJson(response: Response) {
  try {
    return await response.json()
  } catch (error) {
    return null
  }
}

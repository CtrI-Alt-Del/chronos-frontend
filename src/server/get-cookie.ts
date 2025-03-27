'use server'

import { cookies as NextCookies } from 'next/headers'

export async function getCookie(key: string) {
  const cookies = await NextCookies()
  return cookies.get(key)?.value
}

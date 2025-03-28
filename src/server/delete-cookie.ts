'use server'

import { cookies as NextCookies } from 'next/headers'

export async function deleteCookie(key: string) {
  const cookies = await NextCookies()
  cookies.delete(key)
}

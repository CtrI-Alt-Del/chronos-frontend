'use server'

import { cookies as NextCookies } from 'next/headers'

export async function setCookie(key: string, value: string, duration: number) {
  const cookies = await NextCookies()
  cookies.set(key, value, {
    path: '/',
    httpOnly: true,
    maxAge: duration,
  })
}

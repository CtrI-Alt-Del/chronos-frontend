'use server'

import { cookies } from 'next/headers'

export async function setCookieAction(key: string, data: unknown, duration: number) {
    const cookieStore = await cookies()
    cookieStore.set(key, typeof data === 'string' ? data : JSON.stringify(data))
}
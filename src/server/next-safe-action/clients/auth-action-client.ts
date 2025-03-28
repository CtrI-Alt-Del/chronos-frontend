import { notFound } from 'next/navigation'
import { cookies as NextCookies } from 'next/headers'
import { actionClient } from './action-client'
import { jwtDecode } from 'jwt-decode'

import { COOKIES } from '@/@core/global/constants/cookies'
import type { Jwt } from '@/server/auth/types/jwt'

export const authActionClient = actionClient.use(async ({ next }) => {
  const cookies = await NextCookies()
  const cookie = cookies.get(COOKIES.jwt.key)
  if (!cookie?.value) notFound()

  const jwt = jwtDecode<Jwt>(cookie.value)
  const account = JSON.parse(jwt.sub)
  return next({ ctx: { account } })
})

'use server'

import { jwtDecode } from 'jwt-decode'
import { cookies as NextCookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { COOKIES } from '@/@core/global/constants/cookies'
import type { AccountDto } from '@/@core/auth/dtos'
import { ROUTES } from '@/constants/routes'
import type { Role } from '@/@core/global/types'


export async function allowPageByRole(roles: Role[]) {
  const nextCookies = await NextCookies()
  const jwt = nextCookies.get(COOKIES.jwt.key)

  if (!jwt) {
    return redirect(ROUTES.auth.login)
  }

  const account = jwtDecode<AccountDto>(jwt.value)
  console.log({ account });


  if (!roles.map(String).includes(account.role)) {
    return redirect(ROUTES.auth.login)
  }
}


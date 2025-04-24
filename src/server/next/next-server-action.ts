import { notFound, redirect } from 'next/navigation'
import { cookies as NextCookies } from 'next/headers'
import { revalidateTag } from 'next/cache'

import type { Call } from '@/@core/global/interfaces/rpc/call'
import type { AccountDto } from '@/@core/auth/dtos'
import { AppError } from '@/@core/global/errors'

type NextActionServerParams<Request> = {
  request?: Request
  account?: AccountDto
}

export const NextActionServer = <Request = unknown>({
  request,
  account,
}: NextActionServerParams<Request> = {}): Call<Request> => {
  return {
    getRequest() {
      if (!request) throw new AppError('Action server request undefined')
      return request
    },

    redirect(route: string) {
      redirect(route)
    },

    notFound() {
      notFound()
    },

    async resetCache(cacheKey) {
      revalidateTag(cacheKey)
    },

    async setCookie(key: string, value: string, expirationInSeconds?: number) {
      const cookies = await NextCookies()
      cookies.set({
        name: key,
        value,
        httpOnly: true,
        path: '/',
        maxAge: expirationInSeconds,
      })
    },

    async getCookie(key) {
      const cookies = await NextCookies()
      return cookies.get(key)?.value ?? null
    },

    async hasCookie(key) {
      const cookies = await NextCookies()
      const cookie = cookies.get(key)
      return !!cookie
    },

    async deleteCookie(key: string) {
      const cookies = await NextCookies()
      cookies.delete(key)
    },

    async getAccount() {
      if (!account) throw new AppError('Action server account undefined')
      return account
    },
  }
}

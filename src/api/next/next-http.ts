'use server'

import { type NextRequest, NextResponse } from 'next/server'
import { cookies as NextCookies } from 'next/headers'
import { jwtDecode } from 'jwt-decode'
import type { ZodSchema } from 'zod'

import type { NextParams } from './types'
import type { HttpSchema, IHttp } from '@/@core/global/interfaces/http'
import { AppError } from '@/@core/global/errors'
import { COOKIES } from '@/@core/global/constants/cookies'
import type { AccountDto } from '@/@core/auth/dtos'
import { ApiResponse } from '@/@core/global/responses'
import { HTTP_HEADERS } from '@/@core/global/constants/http-headers'
import { HTTP_STATUS_CODE } from '@/@core/global/constants'
import { CLIENT_ENV } from '@/constants/client-env'

type Cookie = {
  key: string
  value: string
  duration: number
}

type NextHttpParams = {
  request?: NextRequest
  schema?: ZodSchema
  params?: NextParams<string>
}

export const NextHttp = async <NextSchema extends HttpSchema>({
  request,
  schema,
  params,
}: NextHttpParams = {}): Promise<IHttp<NextSchema, NextResponse<unknown>>> => {
  let httpSchema: NextSchema
  const cookies: Cookie[] = []

  if (request && schema) {
    let body: HttpSchema['body']
    let queryParams: HttpSchema['queryParams']
    let routeParams: HttpSchema['routeParams']

    // @ts-ignore
    const keys = schema.keyof().options

    if (keys.includes('queryParams')) {
      queryParams = Object.fromEntries(request.nextUrl.searchParams.entries())
    }

    if (keys.includes('body')) {
      body = await request?.json()
    }

    if (keys.includes('routeParams')) {
      if (!params) throw new AppError('Next params not provided')
      routeParams = params.params
    }

    httpSchema = schema.parse({ body, queryParams, routeParams })
  }

  return {
    getCurrentRoute() {
      return request ? request.nextUrl.pathname : ''
    },

    redirect(route: string) {
      const nextResponse = NextResponse.redirect(new URL(route, CLIENT_ENV.webAppUrl))

      if (cookies.length)
        for (const cookie of cookies) {
          nextResponse.cookies.set(cookie.key, cookie.value, {
            path: '/',
            httpOnly: true,
            maxAge: cookie.duration,
          })
        }

      return new ApiResponse({
        body: nextResponse,
        statusCode: HTTP_STATUS_CODE.redirect,
        headers: { [HTTP_HEADERS.location]: route },
      })
    },

    async getAccount() {
      const nextCookies = await NextCookies()
      const jwt = nextCookies.get(COOKIES.jwt.key)
      return jwt ? jwtDecode<AccountDto>(jwt.value) : ({} as AccountDto)
    },

    getBody() {
      if (!httpSchema?.body) throw new AppError('Body is not defined')
      return httpSchema?.body
    },

    getRouteParams() {
      if (!httpSchema?.routeParams) throw new AppError('Route params are not defined')
      return httpSchema?.routeParams
    },

    getQueryParams() {
      if (!httpSchema?.queryParams) throw new AppError('Query params are not defined')
      return httpSchema?.queryParams
    },

    setCookie(key: string, value: string, duration: number) {
      cookies.push({ key, value, duration })
    },

    async getCookie(key: string) {
      const nextCookies = await NextCookies()
      const cookie = nextCookies.get(key)
      return cookie?.value ?? null
    },

    async hasCookie(key: string) {
      const nextCookies = await NextCookies()
      return nextCookies.has(key)
    },

    async deleteCookie(key) {
      const nextCookies = await NextCookies()
      nextCookies.delete(key)
    },

    pass() {
      return new ApiResponse({ headers: { [HTTP_HEADERS.xPass]: 'true' } })
    },

    send(data: unknown, statusCode = HTTP_STATUS_CODE.ok) {
      if (cookies.length) {
        const nextResponse = NextResponse.redirect(
          new URL(request ? request.nextUrl.pathname : '', CLIENT_ENV.webAppUrl),
        )

        for (const cookie of cookies) {
          nextResponse.cookies.set(cookie.key, cookie.value, {
            path: '/',
            httpOnly: true,
            maxAge: cookie.duration,
          })
        }
        return new ApiResponse({
          body: nextResponse,
          statusCode: HTTP_STATUS_CODE.redirect,
        })
      }

      return new ApiResponse({
        body: NextResponse.json(data, { status: statusCode }),
        statusCode,
      })
    },
  }
}

import type { IApiClient } from '@/@core/global/interfaces'
import { ApiResponse, PaginationResponse } from '@/@core/global/responses'
import { addUrlParams } from '../utils'
import { handleApiError } from '../utils'
import type { CacheConfig } from '../types'
import { safeParseJson } from '../utils'
import { HTTP_HEADERS } from '@/@core/global/constants/http-headers'

export const NextApiClient = (
  {
    isCacheEnabled = true,
    refetchInterval = 60 * 60 * 24, // 1 day
    cacheKey,
  }: CacheConfig = {} as CacheConfig,
): IApiClient => {
  let baseUrl: string
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': 'true',
  }

  const requestInit: RequestInit = {
    cache: !isCacheEnabled ? 'no-store' : undefined,
    headers,
    next: isCacheEnabled
      ? {
          revalidate: refetchInterval,
          tags: cacheKey ? [cacheKey] : [],
        }
      : undefined,
  }
  let params: Record<string, string> = {}

  return {
    async get<ResponseBody>(url: string) {
      const response = await fetch(`${baseUrl}${addUrlParams(url, params)}`, {
        ...requestInit,
        method: 'GET',
      })
      params = {}
      const data = await response.json()

      if (!response.ok) {
        return handleApiError<ResponseBody>(data, response.status)
      }

     // const isPagination = response.headers.get(HTTP_HEADERS.pagination) != null
      // if (isPagination) {
      //   return new ApiResponse({
      //     body: new PaginationResponse({
      //       items: data,
      //       itemsCount: Number(response.headers.get(HTTP_HEADERS.itemsCount)),
      //       pagesCount: Number(response.headers.get(HTTP_HEADERS.pagesCount)),
      //     }) as ResponseBody,
      //     statusCode: response.status,
      //   })
      // }

      return new ApiResponse<ResponseBody>({
        body: data,
        statusCode: response.status,
      })
    },
    async patch<ResponseBody>(url: string, body: unknown = {}) {
      const response = await fetch(`${baseUrl}${addUrlParams(url, params)}`, {
        ...requestInit,
        method: 'PATCH',
        body: JSON.stringify(body) ?? {},
      })
      params = {}
      const data = await safeParseJson(response)

      if (!response.ok) {
        return handleApiError<ResponseBody>(data, response.status)
      }

      return new ApiResponse<ResponseBody>({
        body: data,
        statusCode: response.status,
      })
    },

    async post<ResponseBody>(url: string, body: unknown = {}) {
      const response = await fetch(`${baseUrl}${addUrlParams(url, params)}`, {
        ...requestInit,
        method: 'POST',
        body: JSON.stringify(body) ?? {},
      })
      params = {}
      const data = await safeParseJson(response)

      if (!response.ok) {
        return handleApiError<ResponseBody>(data, response.status)
      }

      return new ApiResponse<ResponseBody>({
        body: data,
        statusCode: response.status,
      })
    },

    async put<ResponseBody>(url: string, body: unknown) {
      const response = await fetch(`${baseUrl}${addUrlParams(url, params)}`, {
        ...requestInit,
        method: 'PUT',
        body: JSON.stringify(body) ?? {},
      })
      params = {}
      const data = await safeParseJson(response)

      if (!response.ok) {
        return handleApiError<ResponseBody>(data, response.status)
      }

      return new ApiResponse<ResponseBody>({
        body: data,
        statusCode: response.status,
      })
    },

    async delete(url: string, body: unknown = {}) {
      const response = await fetch(`${baseUrl}${addUrlParams(url, params)}`, {
        ...requestInit,
        method: 'DELETE',
        headers,
        body: JSON.stringify(body),
      })
      params = {}
      const data = await safeParseJson(response)

      if (!response.ok) {
        return handleApiError(data, response.status)
      }

      return new ApiResponse({
        body: data,
        statusCode: response.status,
      })
    },

    async multipart<ResponseBody>(url: string, body: FormData) {
      const response = await fetch(`${baseUrl}${addUrlParams(url, params)}`, {
        method: 'POST',
        body: body,
      })
      params = {}
      const data = await safeParseJson(response)

      if (!response.ok) {
        return handleApiError<ResponseBody>(data, response.status)
      }

      return new ApiResponse<ResponseBody>({
        body: data,
        statusCode: response.status,
      })
    },

    setBaseUrl(url: string) {
      baseUrl = url
    },

    setHeader(key: string, value: string) {
      headers[key] = value
    },

    setParam(key: string, value: string) {
      params[key] = value
    },

    clearParams() {
      params = {}
    },
  }
}

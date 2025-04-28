import { ApiResponse } from '@/@core/global/responses'
import type { RestClient } from '@/@core/global/interfaces/rest'
import type { CacheConfig } from '../types'
import { addUrlParams, handleApiError, safeParseJson } from '../utils'

export const NextRestClient = (
  {
    isCacheEnabled = true,
    refetchInterval = 60 * 60 * 24, // 1 day
    cacheKey,
  }: CacheConfig = {} as CacheConfig,
): RestClient => {
  let baseUrl: string
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': 'true',
  }

  const multiPartRequestHeaders: Record<string, string> = {
    'ngrok-skip-browser-warning': 'true',
  }

  const multiPartRequestInit: RequestInit = {
    cache: !isCacheEnabled ? 'no-store' : undefined,
    headers: multiPartRequestHeaders,

    next: {
      revalidate: isCacheEnabled ? refetchInterval : undefined,
      tags: cacheKey ? [cacheKey] : [],
    },
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
      const data = await safeParseJson(response)

      if (!response.ok) {
        return handleApiError<ResponseBody>(data, response.status)
      }

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
      console.log(`${baseUrl}${addUrlParams(url, params)}`)
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
      const authorizationHeader = headers.Authorization

      if (authorizationHeader) {
        multiPartRequestHeaders.Authorization = authorizationHeader
      }
      const response = await fetch(`${baseUrl}${addUrlParams(url, params)}`, {
        ...multiPartRequestInit,
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

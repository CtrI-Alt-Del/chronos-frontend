import type { IApiClient } from '@/@core/global/interfaces'
import { ApiResponse } from '@/@core/global/responses'
import { addUrlParams } from '../utils'
import { handleApiError } from '../utils'
import type { CacheConfig } from '../types'
import { ApiResponse } from '@/@core/global/responses'

export const NextApiClient = (cacheConfig?: CacheConfig): IApiClient => {
  let baseUrl: string
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  }
  let params: Record<string, string> = {}

  return {
    async get<ResponseBody>(url: string, body: unknown) {
      const response = await fetch(`${baseUrl}${addUrlParams(url, params)}`, {
        method: 'GET',
        headers,
        body: JSON.stringify(body),
        cache: cacheConfig?.isCacheEnabled ? 'force-cache' : 'no-store',
      })
      params = {}
      const data = await response.json()

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
        method: 'PATCH',
        headers,
        body: JSON.stringify(body) ?? {},
      })
      params = {}
      const data = await response.json()

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
        method: 'POST',
        headers,
        body: JSON.stringify(body) ?? {},
      })
      params = {}
      const data = await response.json()

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
        method: 'PUT',
        headers,
        body: JSON.stringify(body) ?? {},
      })
      params = {}
      const data = await response.json()

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
        method: 'DELETE',
        headers,
        body: JSON.stringify(body),
      })
      params = {}
      const data = await response.json()

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
      const data = await response.json()

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

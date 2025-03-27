import type { AccountDto } from '@/@core/auth/dtos'
import type { ApiResponse } from '../responses'

export type HttpSchema = {
  body?: unknown
  routeParams?: unknown
  queryParams?: unknown
}

export interface IHttp<Schema extends HttpSchema = HttpSchema, Response = unknown> {
  getCurrentRoute(): string
  redirect(route: string): ApiResponse
  getBody(): Schema['body']
  getRouteParams(): Schema['routeParams']
  getQueryParams(): Schema['queryParams']
  getAccount(): Promise<AccountDto>
  setCookie(key: string, value: string, duration: number): void
  getCookie(key: string): Promise<string | null>
  hasCookie(key: string): Promise<boolean>
  deleteCookie(key: string): Promise<void>
  hasCookie(key: string): Promise<boolean>
  pass(): ApiResponse
  send(data?: unknown, statusCode?: number): ApiResponse<Response>
}

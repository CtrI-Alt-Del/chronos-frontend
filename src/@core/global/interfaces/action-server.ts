import type { AccountDto } from '@/@core/auth/dtos'

export interface IActionServer<Request = void> {
  getRequest(): Request
  redirect(route: string): never
  notFound(): never
  setCookie(key: string, value: string, duration?: number): Promise<void>
  getCookie(key: string): Promise<string | null>
  deleteCookie(key: string): Promise<void>
  hasCookie(key: string): Promise<boolean>
  getAccount(): Promise<AccountDto>
  resetCache(cacheKey: string): void
}

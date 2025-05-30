import type { ApiResponse } from '../../responses/api-response'

export interface RestClient {
  get<ResponseBody>(url: string, body?: unknown): Promise<ApiResponse<ResponseBody>>
  patch<ResponseBody>(url: string, body?: unknown): Promise<ApiResponse<ResponseBody>>
  post<ResponseBody>(url: string, body?: unknown): Promise<ApiResponse<ResponseBody>>
  put<ResponseBody>(url: string, body: unknown): Promise<ApiResponse<ResponseBody>>
  delete(url: string, body?: unknown): Promise<ApiResponse<void>>
  multipart<ResponseBody>(url: string, body: FormData): Promise<ApiResponse<ResponseBody>>
  setBaseUrl(url: string): void
  setHeader(key: string, value: string): void
  setParam(key: string, value: string): void
  clearParams(): void
}

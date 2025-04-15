import type { ApiResponse } from '../responses'

export interface IAuthService {
  login: (email: string, password: string) => Promise<ApiResponse<{ jwt: string }>>
  updatePassword: (accountId: string, passwordId: string) => Promise<ApiResponse<void>>
  disable(accountId: string): Promise<ApiResponse<void>>
  enable(accountId: string): Promise<ApiResponse<void>>
}

import type { AccountDto } from '@/@core/auth/dtos'
import type { IApiClient } from '@/@core/global/interfaces/api-client'
import type { IAuthService } from '@/@core/global/interfaces/auth-service'


export const AuthService = (apiClient: IApiClient): IAuthService => {
  return {
    async login(email: string, password: string) {
      return await apiClient.post<{ jwt: string }>('/auth/login', { email, password })
    },
  }
} 
import type { IApiClient } from '@/@core/global/interfaces/api-client'
import type { IAuthService } from '@/@core/global/interfaces/auth-service'

export const AuthService = (apiClient: IApiClient): IAuthService => {
  return {
    async login(email: string, password: string) {
      return await apiClient.post('/auth/login', { email, password })
    },

    async updatePassword(collaboratorId: string, password: string) {
      return await apiClient.patch(`/auth/${collaboratorId}/password`, {
        password,
      })
    },
    async enable(accountId) {
        return await apiClient.patch(`/auth/accounts/${accountId}/enable`)
    },
    async disable(accountId) {
        return await apiClient.patch(`/auth/accounts/${accountId}/disable`)
    }
  }
}

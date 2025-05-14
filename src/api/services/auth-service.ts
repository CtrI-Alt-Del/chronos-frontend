import type { RestClient } from '@/@core/global/interfaces/rest/rest-client'
import type { AuthService as IAuthClient } from '@/@core/auth/interfaces/auth-service'

export const AuthService = (restClient: RestClient): IAuthClient => {
  const MODULE = '/auth'

  return {
    async login(otpCode) {
      return await restClient.post(`${MODULE}/login`, { otpCode })
    },

    async requestAuthentication(email, password) {
      return await restClient.post(MODULE, {
        email,
        password,
      })
    },

    async enableCollaboratorAccount(collaboratorId) {
      return await restClient.patch(`${MODULE}/accounts/${collaboratorId}/enable`)
    },

    async disableCollaboratorAccount(collaboratorId) {
      return await restClient.patch(`${MODULE}/accounts/${collaboratorId}/disable`)
    },

    async updateCollaboratorPassword(collaboratorId, password) {
      return await restClient.patch(`/auth/accounts/${collaboratorId}/password`, {
        password,
      })
    },
  }
}

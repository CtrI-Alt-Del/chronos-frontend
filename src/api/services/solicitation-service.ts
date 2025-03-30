import type { IApiClient } from '@/@core/global/interfaces'
import type { ISolicitationService } from '@/@core/solicitation/interfaces'

export const SolicitationService = (apiClient: IApiClient): ISolicitationService => {
  const MODULE = '/solicitation'
  return {
    async listSolicitations() {
      return await apiClient.get(`${MODULE}/solicitations`)
    },
    async createWorkScheduleAdjustmentSolicitation(solicitation) {
      return await apiClient.post(`${MODULE}/work-schedule-adjustment`, solicitation)
    },
    async resolveSolicitation(solicitationId: string, action: "APPROVED" | "DENIED") {
      const value = action
      return await apiClient.post(`${MODULE}/resolve/${solicitationId}`, { value })
    },
    createTimePunchLogAdjustmentSolicitation(solicitation) {
      return apiClient.post(`${MODULE}/time-punch-adjustment`, solicitation)
    },
  }
}

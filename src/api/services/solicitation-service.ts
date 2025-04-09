import type { IApiClient } from '@/@core/global/interfaces'
import type { ISolicitationService } from '@/@core/solicitation/interfaces'

export const SolicitationService = (apiClient: IApiClient): ISolicitationService => {
  const MODULE = '/solicitation'
  return {
    async listSolicitations() {
      return await apiClient.get(`${MODULE}/solicitations`)
    },
    async createWorkScheduleAdjustmentSolicitation(solicitation ) {
      return await apiClient.post(`${MODULE}/day-off-schedule-adjustment`, solicitation)
    },
    async resolveSolicitation(solicitationId: string, action: "APPROVED" | "DENIED") {
      const status = action
      return await apiClient.patch(`${MODULE}/resolve/${solicitationId}`, { status })
    },
    createTimePunchLogAdjustmentSolicitation(solicitation) {
      return apiClient.post(`${MODULE}/time-punch-adjustment`, solicitation)
    },
  }
}

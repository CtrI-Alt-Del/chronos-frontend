import type { RestClient } from '@/@core/global/interfaces/rest'
import type { SolicitationService as ISolicitationService } from '@/@core/solicitation/interfaces'

export const SolicitationService = (restClient: RestClient): ISolicitationService => {
  const MODULE = '/solicitation'
  return {
    async listSolicitations() {
      return await restClient.get(`${MODULE}/solicitations`)
    },
    async createWorkScheduleAdjustmentSolicitation(solicitation) {
      return await restClient.post(`${MODULE}/work-schedule-adjustment`, solicitation)
    },
    async resolveSolicitation(solicitationId: string, action: 'APPROVED' | 'DENIED') {
      const status = action
      return await restClient.patch(`${MODULE}/resolve/${solicitationId}`, { status })
    },
    createTimePunchLogAdjustmentSolicitation(solicitation) {
      return restClient.post(`${MODULE}/time-punch-adjustment`, solicitation)
    },
  }
}

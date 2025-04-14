import type { IApiClient } from '@/@core/global/interfaces'
import type { ISolicitationService } from '@/@core/solicitation/interfaces'
import type { DayOffScheduleAdjustmentSolicitationDto } from '@/@core/solicitation/dtos'

export const SolicitationService = (apiClient: IApiClient): ISolicitationService => {
  const MODULE = '/solicitation'
  return {
    async listSolicitations() {
      return await apiClient.get(`${MODULE}/solicitations`)
    },
    async createDayOffScheduleAdjustmentSolicitation(solicitation: DayOffScheduleAdjustmentSolicitationDto) {
      return await apiClient.post(`${MODULE}/day-off-schedule-adjustment`, solicitation)
    },
    async resolveSolicitation(solicitationId: string, action: "APPROVED" | "DENIED",solicitationType: "DAY_OFF_SCHEDULE" | "TIME_PUNCH") {
      const status = action 
      return await apiClient.patch(`${MODULE}/resolve/${solicitationId}`, { status,solicitationType })
    },
    createTimePunchLogAdjustmentSolicitation(solicitation) {
      return apiClient.post(`${MODULE}/time-punch-adjustment`, solicitation)
    },
  }
}

import type { SolicitationService as ISolicitationService } from '@/@core/solicitation/interfaces'
import type { DayOffScheduleAdjustmentSolicitationDto } from '@/@core/solicitation/dtos'
import type { RestClient } from '@/@core/global/interfaces/rest'

export const SolicitationService = (restClient: RestClient): ISolicitationService => {
  const MODULE = '/solicitation'
  return {
    async listSolicitations() {
      return await restClient.get(`${MODULE}/solicitations`)
    },

    async createDayOffScheduleAdjustmentSolicitation(
      solicitation: DayOffScheduleAdjustmentSolicitationDto,
    ) {
      return await restClient.post(`${MODULE}/day-off-schedule-adjustment`, solicitation)
    },

    async resolveSolicitation(
      solicitationId: string,
      action: 'APPROVED' | 'DENIED',
      solicitationType: 'DAY_OFF_SCHEDULE' | 'TIME_PUNCH',
    ) {
      const status = action
      return await restClient.patch(`${MODULE}/resolve/${solicitationId}`, {
        status,
        solicitationType,
      })
    },

    createTimePunchLogAdjustmentSolicitation(solicitation) {
      return restClient.post(`${MODULE}/time-punch-adjustment`, solicitation)
    },
  }
}

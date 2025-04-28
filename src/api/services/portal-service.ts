import type { DayOffScheduleAdjustmentSolicitationDto } from '@/@core/portal/dtos'
import type { RestClient } from '@/@core/global/interfaces/rest'
import type { PortalService as IPortalService } from '@/@core/portal/interfaces'

export const PortalService = (restClient: RestClient): IPortalService => {
  const SOLICITATIONS_ROUTE = '/solicitation/solicitations'
  const JUSTIFICATION_TYPE_ROUTE = '/solicitation/justification-type'

  return {
    async getJustificationAttachmentUrl(key) {
      return await restClient.get(
        `${SOLICITATIONS_ROUTE}/justification-attachment/${key}`,
      )
    },

    async createDayOffScheduleAdjustmentSolicitation(
      solicitation: DayOffScheduleAdjustmentSolicitationDto,
    ) {
      return await restClient.post(
        `${SOLICITATIONS_ROUTE}/day-off-schedule-adjustment`,
        solicitation,
      )
    },

    async createDayOffSolicitation(dayOff, observation?) {
      return await restClient.post(`${SOLICITATIONS_ROUTE}/day-off`, {
        dayOff,
        description: observation,
      })
    },

    async listDayOffSolicitations(page) {
      restClient.setParam('page', String(page))
      return await restClient.get(`${SOLICITATIONS_ROUTE}/day-off`)
    },

    async approveDayOffSolicitation(solicitationId, feedbackMessage) {
      return await restClient.put(
        `${SOLICITATIONS_ROUTE}/${solicitationId}/approve/day-off`,
        {
          feedbackMessage,
        },
      )
    },

    async createPaidOvertimeSolicitation() {
      return await restClient.post(`${SOLICITATIONS_ROUTE}/paid-overtime`)
    },

    async listPaidOvertimeSolicitations(page) {
      restClient.setParam('page', String(page))
      return await restClient.get(`${SOLICITATIONS_ROUTE}/paid-overtime`)
    },

    async approvePaidOvertimeSolicitation(solicitationId, feedbackMessage) {
      return await restClient.put(
        `${SOLICITATIONS_ROUTE}/${solicitationId}/approve/paid-overtime`,
        {
          feedbackMessage,
        },
      )
    },

    async createExcusedAbsenceSolicitation(absenceDate) {
      return await restClient.post(`${SOLICITATIONS_ROUTE}/excused-absence`,absenceDate)
    },

    async listExcusedAbsenceSolicitations(page) {
      restClient.setParam('page', String(page))
      return await restClient.get(`${SOLICITATIONS_ROUTE}/excused-absence`)
    },

    async approveExcusedAbsenceSolicitation(solicitationId, feedbackMessage) {
      return await restClient.put(
        `${SOLICITATIONS_ROUTE}/${solicitationId}/approve/excused-absence`,
        {
          feedbackMessage,
        },
      )
    },

    async createTimePunchLogAdjustmentSolicitation(solicitation) {
      return restClient.post(`${SOLICITATIONS_ROUTE}/time-punch-adjustment`, solicitation)
    },

    async denySolicitation(solicitationId, feedbackMessage) {
      return restClient.patch(`${SOLICITATIONS_ROUTE}/${solicitationId}/deny`, {
        feedbackMessage,
      })
    },

    async listJustificationTypes() {
      return await restClient.get(`${JUSTIFICATION_TYPE_ROUTE}`)
    },

    async createJustificationType(justificationType) {
      return await restClient.post(`${JUSTIFICATION_TYPE_ROUTE}`, justificationType)
    },

    async updateJustificationType(justificationType, id) {
      return await restClient.put(`${JUSTIFICATION_TYPE_ROUTE}/${id}`, justificationType)
    },

    async deleteJustificationType(id) {
      return await restClient.delete(`${JUSTIFICATION_TYPE_ROUTE}/${id}`)
    },
  }
}

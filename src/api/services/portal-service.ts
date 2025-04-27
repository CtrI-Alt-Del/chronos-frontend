import type { DayOffScheduleAdjustmentSolicitationDto } from '@/@core/portal/dtos'
import type { RestClient } from '@/@core/global/interfaces/rest'
import type { PortalService as IPortalService } from '@/@core/portal/interfaces'

export const PortalService = (restClient: RestClient): IPortalService => {
  const SOLICITATIONS_ROUTE = '/solicitation/solicitations'
  const JUSTIFICATION_TYPE_ROUTE = '/solicitation/justification-type'

  return {
    async getJustificationAttachmentUrl(key: string) {
      return await restClient.get(`${SOLICITATIONS_ROUTE}/attachments/${key}`)
    },

    async listSolicitations() {
      return await restClient.get(`${SOLICITATIONS_ROUTE}`)
    },

    async createDayOffSolicitation(
      dayOff: string,
      justificationTypeId: string,
      description: string,
      justificationTypeName: string,
      justificationTypeShouldHaveAttachment: string,
      attachment?: File,
    ) {
      const formData = new FormData()
      formData.append('dayOff', dayOff)
      formData.append('justificationTypeId', justificationTypeId)
      formData.append('description', description)
      formData.append('justificationTypeName', justificationTypeName)
      formData.append(
        'justificationTypeShouldHaveAttachment',
        justificationTypeShouldHaveAttachment,
      )
      if (attachment != null) {
        formData.append('attachment', attachment)
      }
      return await restClient.multipart(`${SOLICITATIONS_ROUTE}/day-off`, formData)
    },

    async createDayOffScheduleAdjustmentSolicitation(
      solicitation: DayOffScheduleAdjustmentSolicitationDto,
    ) {
      return await restClient.post(
        `${SOLICITATIONS_ROUTE}/day-off-schedule-adjustment`,
        solicitation,
      )
    },

    async createPaidOvertimeSolicitation() {
      return await restClient.post(`${SOLICITATIONS_ROUTE}/paid-overtime`)
    },

    async approvePaidOvertimeSolicitation(feedbackMessage: string) {
      return await restClient.put(`${SOLICITATIONS_ROUTE}/paid-overtime/approve`, {
        feedbackMessage,
      })
    },

    async listPaidOvertimeSolicitations(page: number) {
      restClient.setParam('page', String(page))
      return await restClient.get(`${SOLICITATIONS_ROUTE}/paid-overtime`)
    },

    async resolveSolicitation(
      solicitationId: string,
      action: 'APPROVED' | 'DENIED',
      solicitationType: 'DAY_OFF_SCHEDULE' | 'TIME_PUNCH' | 'DAY_OFF',
    ) {
      const status = action
      return await restClient.patch(`${SOLICITATIONS_ROUTE}/resolve/${solicitationId}`, {
        status,
        solicitationType,
      })
    },

    async createTimePunchLogAdjustmentSolicitation(solicitation) {
      return restClient.post(`${SOLICITATIONS_ROUTE}/time-punch-adjustment`, solicitation)
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

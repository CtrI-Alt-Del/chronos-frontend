import type { DayOffScheduleAdjustmentSolicitationDto } from '@/@core/solicitation/dtos'
import type { RestClient } from '@/@core/global/interfaces/rest'
import type { ISolicitationService } from '@/@core/solicitation/interfaces'

export const SolicitationService = (restClient: RestClient): ISolicitationService => {
  const SOLICITATIONS_ROUTE = '/solicitation/solicitations'
  const JUSTIFICATION_TYPE_ROUTE = '/solicitation/justification-type'
  return {
    async getJustificationAttachmentUrl(key:string){
      return await restClient.get(`${SOLICITATIONS_ROUTE}/attachments/${key}`)
    },

    async listSolicitations() {
      return await restClient.get(`${SOLICITATIONS_ROUTE}`)
    },

    async createDayOffSolicitation(dayOff:string,justificationTypeId:string,description:string,justificationTypeName:string,justificationTypeShouldHaveAttachment:string,attachment?:File) {
      const formData = new FormData()
      formData.append('dayOff', dayOff)
      formData.append('justificationTypeId', justificationTypeId)
      formData.append('description', description)
      formData.append('justificationTypeName', justificationTypeName)
      formData.append('justificationTypeShouldHaveAttachment', justificationTypeShouldHaveAttachment)
      if (attachment != null) {
        formData.append('attachment', attachment)
      }
      return await restClient.multipart(`${SOLICITATIONS_ROUTE}/day-off`, formData)
    },

    async createDayOffScheduleAdjustmentSolicitation(
      solicitation: DayOffScheduleAdjustmentSolicitationDto,
    ) {
      return await restClient.post(`${SOLICITATIONS_ROUTE}/day-off-schedule-adjustment`, solicitation)
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
    createTimePunchLogAdjustmentSolicitation(solicitation) {
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

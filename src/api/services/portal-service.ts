import type { RestClient } from '@/@core/global/interfaces/rest'
import type { WorkLeaveSolicitationDto } from '@/@core/portal/dtos'
import type { PortalService as IPortalService } from '@/@core/portal/interfaces'

export const PortalService = (restClient: RestClient): IPortalService => {
  const SOLICITATIONS_RESOURCE = '/portal/solicitations'
  const JUSTIFICATION_TYPE_RESOURCE = '/portal/justification-type'
  const WORK_LEAVE_CALENDAR_RESOURCE = '/portal/work-leave-calendar'

  return {
    async cancelSolicitation(solicitationId) {
      return await restClient.patch(`${SOLICITATIONS_RESOURCE}/${solicitationId}/cancel`)
    },

    async createVacationSolicitation(solicitation: WorkLeaveSolicitationDto) {
      return await restClient.post(
        `${SOLICITATIONS_RESOURCE}/work-leave/vacation`,
        solicitation,
      )
    },

    async createWithdrawSolicitation(solicitation: WorkLeaveSolicitationDto) {
      return await restClient.post(
        `${SOLICITATIONS_RESOURCE}/work-leave/withdraw`,
        solicitation,
      )
    },

    async approveWithdrawSolicitation(solicitationId, feedbackMessage) {
      return await restClient.put(
        `${SOLICITATIONS_RESOURCE}/${solicitationId}/approve/withdraw`,
        {
          feedbackMessage,
        },
      )
    },

    async listWithdrawSolicitations(page) {
      restClient.setParam('page', String(page))
      return await restClient.get(`${SOLICITATIONS_RESOURCE}/work-leave/withdraw`)
    },

    async listDayOffScheduleAdjustmentSolicitations(page) {
      restClient.setParam('page', String(page))
      return await restClient.get(`${SOLICITATIONS_RESOURCE}/day-off-schedule-adjustment`)
    },

    async approveDayOffScheduleAdjustmentSolicitation(solicitationId, feedbackMessage) {
      return await restClient.put(
        `${SOLICITATIONS_RESOURCE}/${solicitationId}/approve/day-off-schedule-adjustment`,
        {
          feedbackMessage,
        },
      )
    },

    async attachJustificationToSolicitation(
      solicitationId,
      justificationTypeId,
      justificationTypeName,
      justificationTypeShouldHaveAttachment,
      description,
      attachment,
    ) {
      const formData = new FormData()
      formData.append('solicitationId', solicitationId)
      formData.append('justificationTypeId', justificationTypeId)
      formData.append('justificationTypeName', justificationTypeName)
      formData.append(
        'justificationTypeShouldHaveAttachment',
        justificationTypeShouldHaveAttachment,
      )
      formData.append('description', description)
      if (attachment) {
        formData.append('attachment', attachment)
      }

      return await restClient.multipart('/portal/justification/attach', formData)
    },
    async getJustificationAttachmentUrl(key) {
      return await restClient.get(`${SOLICITATIONS_RESOURCE}/attachments/${key}`)
    },

    async getWorkLeaveCalendar(year, month, collaboratorName) {
      restClient.setParam('year', String(year))
      restClient.setParam('month', String(month))
      if (collaboratorName) restClient.setParam('collaboratorName', collaboratorName)

      return await restClient.get(`${WORK_LEAVE_CALENDAR_RESOURCE}`)
    },

    async createDayOffScheduleAdjustmentSolicitation(dayOffSchedule) {
      return await restClient.post(
        `${SOLICITATIONS_RESOURCE}/day-off-schedule-adjustment`,
        {
          dayOffSchedule: dayOffSchedule,
        },
      )
    },

    async createDayOffSolicitation(dayOff, observation?) {
      return await restClient.post(`${SOLICITATIONS_RESOURCE}/day-off`, {
        dayOff,
        description: observation,
        workload: 8,
      })
    },

    async listDayOffSolicitations(page) {
      restClient.setParam('page', String(page))
      return await restClient.get(`${SOLICITATIONS_RESOURCE}/day-off`)
    },

    async approveDayOffSolicitation(solicitationId, feedbackMessage) {
      return await restClient.put(
        `${SOLICITATIONS_RESOURCE}/${solicitationId}/approve/day-off`,
        {
          feedbackMessage,
        },
      )
    },

    async createExcusedAbsenceSolicitation(absenceDate) {
      return await restClient.post(`${SOLICITATIONS_RESOURCE}/excused-absence`, {
        absenceDate: absenceDate,
      })
    },

    async listExcusedAbsenceSolicitations(page) {
      restClient.setParam('page', String(page))
      return await restClient.get(`${SOLICITATIONS_RESOURCE}/excused-absence`)
    },

    async approveExcusedAbsenceSolicitation(solicitationId, feedbackMessage) {
      return await restClient.put(
        `${SOLICITATIONS_RESOURCE}/${solicitationId}/approve/excused-absence`,
        {
          feedbackMessage,
        },
      )
    },

    async createTimePunchLogAdjustmentSolicitation(solicitation) {
      return restClient.post(
        `${SOLICITATIONS_RESOURCE}/time-punch-adjustment`,
        solicitation,
      )
    },

    async listTimePunchLogAdjustmentSolicitations(page) {
      restClient.setParam('page', String(page))
      return await restClient.get(`${SOLICITATIONS_RESOURCE}/time-punch-adjustment`)
    },

    async approveTimePunchLogAdjustmentSolicitation(solicitationId, feedbackMessage) {
      return await restClient.put(
        `${SOLICITATIONS_RESOURCE}/${solicitationId}/approve/time-punch-adjustment`,
        { feedbackMessage },
      )
    },

    async denySolicitation(solicitationId, feedbackMessage) {
      return restClient.patch(`${SOLICITATIONS_RESOURCE}/${solicitationId}/deny`, {
        feedbackMessage,
      })
    },

    async listJustificationTypes() {
      return await restClient.get(`${JUSTIFICATION_TYPE_RESOURCE}`)
    },

    async createJustificationType(justificationType) {
      return await restClient.post(`${JUSTIFICATION_TYPE_RESOURCE}`, justificationType)
    },

    async updateJustificationType(justificationType, id) {
      return await restClient.put(
        `${JUSTIFICATION_TYPE_RESOURCE}/${id}`,
        justificationType,
      )
    },

    async deleteJustificationType(id) {
      return await restClient.delete(`${JUSTIFICATION_TYPE_RESOURCE}/${id}`)
    },

    async listVacationSolicitations(page) {
      restClient.setParam('page', String(page))
      return await restClient.get(`${SOLICITATIONS_RESOURCE}/work-leave/vacation`)
    },

    async approveVacationSolicitation(solicitationId, feedbackMessage) {
      return await restClient.put(
        `${SOLICITATIONS_RESOURCE}/${solicitationId}/approve/vacation`,
        {
          feedbackMessage,
        },
      )
    },
  }
}

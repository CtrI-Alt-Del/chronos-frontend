import type { RestClient } from '@/@core/global/interfaces/rest'
import type { PortalService as IPortalService } from '@/@core/portal/interfaces'

export const PortalService = (restClient: RestClient): IPortalService => {
  const SOLICITATIONS_RESOURCE = '/portal/solicitations'
  const JUSTIFICATION_TYPE_RESOURCE = '/portal/justification-type'
  const WORK_LEAVE_CALENDAR_RESOURCE = '/portal/work-leave-calendar'

  return {
    async createVacationSolicitation(startedAt, endedAt) {
      return await restClient.post(`${SOLICITATIONS_RESOURCE}/work-leave/vacation`, {
        startedAt,
        endedAt,
      })
    },

    async cancelSolicitation(solicitationId) {
      return await restClient.patch(`${SOLICITATIONS_RESOURCE}/${solicitationId}/cancel`)
    },

    async createWithdrawSolicitation(startedAt, endedAt) {
      return await restClient.post(`${SOLICITATIONS_RESOURCE}/work-leave/withdraw`, {
        startedAt,
        endedAt,
      })
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

    async getWorkLeaveCalendar(year, month) {
      restClient.setParam('year', String(year))
      restClient.setParam('month', String(month))
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

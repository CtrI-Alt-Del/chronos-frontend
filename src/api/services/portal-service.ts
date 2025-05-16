import type { RestClient } from '@/@core/global/interfaces/rest'
import type { PortalService as IPortalService } from '@/@core/portal/interfaces'

export const PortalService = (restClient: RestClient): IPortalService => {
  const SOLICITATIONS_ROUTE = '/solicitation/solicitations'
  const JUSTIFICATION_TYPE_ROUTE = '/solicitation/justification-type'

  return {
    async createVacationSolicitation(vacationDays) {
      return await restClient.post(`${SOLICITATIONS_ROUTE}/vacation`, {
        vacationDays,
      })
    },

    async cancelSolicitation(solicitationId) {
      return await restClient.patch(`${SOLICITATIONS_ROUTE}/${solicitationId}/cancel`)
    },

    async createWithdrawSolicitation(withdrawalDays) {
      return await restClient.post(`${SOLICITATIONS_ROUTE}/withdraw`, {
        withdrawalDays,
      })
    },

    async approveWithdrawSolicitation(solicitationId, feedbackMessage) {
      return await restClient.put(
        `${SOLICITATIONS_ROUTE}/${solicitationId}/approve/withdraw`,
        {
          feedbackMessage,
        },
      )
    },

    async listWithdrawSolicitations(page) {
      restClient.setParam('page', String(page))
      return await restClient.get(`${SOLICITATIONS_ROUTE}/withdraw`)
    },
    async listDayOffScheduleAdjustmentSolicitations(page) {
      restClient.setParam('page', String(page))
      return await restClient.get(`${SOLICITATIONS_ROUTE}/day-off-schedule-adjustment`)
    },
    async approveDayOffScheduleAdjustmentSolicitation(solicitationId, feedbackMessage) {
      return await restClient.put(
        `${SOLICITATIONS_ROUTE}/${solicitationId}/approve/day-off-schedule-adjustment`,
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
      if (attachment != undefined) {
        formData.append('attachment', attachment)
      }

      return await restClient.multipart(`/solicitation/justification/attach`, formData)
    },
    async getJustificationAttachmentUrl(key) {
      return await restClient.get(`${SOLICITATIONS_ROUTE}/attachments/${key}`)
    },

    async createDayOffScheduleAdjustmentSolicitation(dayOffSchedule) {
      return await restClient.post(`${SOLICITATIONS_ROUTE}/day-off-schedule-adjustment`, {
        dayOffSchedule: dayOffSchedule,
      })
    },

    async createDayOffSolicitation(dayOff, observation?) {
      return await restClient.post(`${SOLICITATIONS_ROUTE}/day-off`, {
        dayOff,
        description: observation,
        workload: 8,
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
      return await restClient.post(`${SOLICITATIONS_ROUTE}/excused-absence`, {
        absenceDate: absenceDate,
      })
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
    async listVacationSolicitations(page) {
      restClient.setParam('page', String(page))
      return await restClient.get(`${SOLICITATIONS_ROUTE}/vacation`)
    },
    async approveVacationSolicitation(solicitationId, feedbackMessage) {
      return await restClient.put(
        `${SOLICITATIONS_ROUTE}/${solicitationId}/approve/vacation`,
        {
          feedbackMessage,
        },
      )
    },
  }
}

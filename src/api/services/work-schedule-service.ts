import type { RestClient } from '@/@core/global/interfaces/rest/rest-client'
import type { WorkScheduleService as IWorkScheduleService } from '@/@core/work-schedule/interfaces'
import { DatetimeProvider } from '@/providers'

export const WorkScheduleService = (restClient: RestClient): IWorkScheduleService => {
  const MODULE = '/work-schedule'

  return {
    async getTodayWorkdayLog(collaboratorId) {
      return await restClient.get(`${MODULE}/workday-logs/${collaboratorId}/today`)
    },

    async createDayOffSchedule(collaboratorId, dayOffSchedule) {
      return await restClient.post(
        `${MODULE}/day-off-schedules/${collaboratorId}`,
        dayOffSchedule,
      )
    },

    async getDayOffSchedule(collaboratorId) {
      return await restClient.get(`${MODULE}/day-off-schedules/${collaboratorId}`)
    },

    async updateDayOffSchedule(collaboratorId, dayOffSchedule) {
      return await restClient.put(
        `${MODULE}/day-off-schedules/${collaboratorId}`,
        dayOffSchedule,
      )
    },

    async getCollaborationSectorHistory(date, collaboratorName = '', page = 1) {
      restClient.setParam('date', date)
      restClient.setParam('collaboratorName', collaboratorName)
      restClient.setParam('page', String(page))
      return await restClient.get(`${MODULE}/workday-logs/history`)
    },

    async getCollaboratorHistory(collaboratorId, startDate, endDate, page = 1) {
      restClient.setParam('startDate', startDate)
      restClient.setParam('endDate', endDate)
      restClient.setParam('page', String(page))
      return await restClient.get(`${MODULE}/workday-logs/history/${collaboratorId}`)
    },

    async updateTimePunchSchedule(timePunch) {
      return await restClient.put(`${MODULE}/time-punches/${timePunch.id}`, timePunch)
    },

    async adjustTimePunch(timePunchId, time, period) {
      return await restClient.patch(`${MODULE}/time-punches/${timePunchId}/adjust`, {
        time,
        period,
      })
    },

    async punchTime(timePunchLogId, time) {
      const datetimeProvider = DatetimeProvider()
      return await restClient.patch(`${MODULE}/time-punches/${timePunchLogId}`, {
        time: datetimeProvider.formatTime(time),
      })
    },

    async scheduleDaysOff(workdaysCount, daysOffCount) {
      restClient.setParam('workdaysCount', String(workdaysCount))
      restClient.setParam('daysOffCount', String(daysOffCount))
      return await restClient.get(`${MODULE}/day-off-schedules`)
    },
  }
}

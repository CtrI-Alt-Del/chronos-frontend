import type { RestClient } from '@/@core/global/interfaces/rest/rest-client'
import type { WorkScheduleService as IWorkScheduleService } from '@/@core/work-schedule/interfaces'

export const WorkScheduleService = (restClient: RestClient): IWorkScheduleService => {
  const MODULE = '/work-schedule'

  return {
    async getWorkTime(collaboratorId) {
      return await restClient.get(`${MODULE}/workday-logs/work-time/${collaboratorId}`)
    },

    async getTodayWorkdayLog(collaboratorId) {
      return await restClient.get(`${MODULE}/workday-logs/${collaboratorId}/today`)
    },

    async getTimeCard(collaboratorId: string, month: number, year: number) {
      restClient.setParam('month', String(month))
      restClient.setParam('year', String(year))
      return await restClient.get(`${MODULE}/time-card/${collaboratorId}`)
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

    async adjustTimePunch(workdayLogId, time, period) {
      return await restClient.patch(
        `${MODULE}/workday-logs/${workdayLogId}/adjust-time-punch`,
        {
          time,
          period,
        },
      )
    },

    async punchTime(workdayLogId, time) {
      return await restClient.patch(`${MODULE}/workday-logs/${workdayLogId}/punch-time`, {
        time,
      })
    },

    async scheduleDaysOff(workdaysCount, daysOffCount) {
      restClient.setParam('workdaysCount', String(workdaysCount))
      restClient.setParam('daysOffCount', String(daysOffCount))
      return await restClient.get(`${MODULE}/day-off-schedules`)
    },
  }
}

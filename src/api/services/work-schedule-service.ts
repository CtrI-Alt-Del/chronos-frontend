import type { IApiClient } from '@/@core/global/interfaces/api-client'
import type { WorkdayLogDto } from '@/@core/work-schedule/dtos'
import type { IWorkScheduleService } from '@/@core/work-schedule/interfaces'
import { DatetimeProvider } from '@/providers'

export const WorkScheduleService = (apiClient: IApiClient): IWorkScheduleService => {
  const MODULE = '/work-schedule'

  return {
    async getTodayWorkdayLog(collaboratorId) {
      return await apiClient.get<WorkdayLogDto>(
        `${MODULE}/workday-logs/${collaboratorId}/today`,
      )
    },

    async createCollaboratorSchedule(collaboratorSchedule) {
      return await apiClient.post(
        `${MODULE}/collaborator-schedules/${collaboratorSchedule.collaboratorId}`,
        collaboratorSchedule,
      )
    },

    async getWeekSchedule(collaboratorId) {
      return await apiClient.get(`${MODULE}/week-schedules/${collaboratorId}`)
    },

    async getDayOffSchedule(collaboratorId) {
      return await apiClient.get(`${MODULE}/day-off-schedules/${collaboratorId}`)
    },

    async reportSectorHistory(date, page = 1) {
      apiClient.setParam('date', date)
      apiClient.setParam('page', String(page))
      return await apiClient.get(`${MODULE}/workday-logs/history`)
    },

    async reportCollaboratorHistory(collaboratorId, startDate, endDate, page = 1) {
      apiClient.setParam('startDate', startDate)
      apiClient.setParam('endDate', endDate)
      apiClient.setParam('page', String(page))
      return await apiClient.get(`${MODULE}/workday-logs/history/${collaboratorId}`)
    },

    async createWorkSchedule(workSchedule) {
      return await apiClient.post(`${MODULE}/schedules`, workSchedule)
    },

    async updateDayOffSchedule(collaboratorId, dayOffSchedule) {
      return await apiClient.put(
        `${MODULE}/day-off-schedules/${collaboratorId}`,
        dayOffSchedule,
      )
    },

    async updateWeekSchedule(collaboratorId, weekSchedule) {
      return await apiClient.put(
        `${MODULE}/week-schedules/${collaboratorId}`,
        weekSchedule,
      )
    },

    async updateTimePunchSchedule(timePunch) {
      return await apiClient.put(`${MODULE}/time-punches/${timePunch.id}`, timePunch)
    },

    async adjustTimePunchLog(timePunchScheduleId, timeLog, timePunchPeriod) {
      return await apiClient.patch(
        `${MODULE}/time-punches/${timePunchScheduleId}/adjust`,
        {
          time: timeLog,
          period: timePunchPeriod,
        },
      )
    },

    async punchTime(timePunchLogId, time) {
      const datetimeProvider = DatetimeProvider()
      return await apiClient.patch(`${MODULE}/time-punches/${timePunchLogId}`, {
        time: datetimeProvider.formatTime(time),
      })
    },

    async scheduleDaysOff(workdaysCount, daysOffCount) {
      apiClient.setParam('workdaysCount', String(workdaysCount))
      apiClient.setParam('daysOffCount', String(daysOffCount))
      return await apiClient.get(`${MODULE}/day-off-schedules`)
    },
  }
}

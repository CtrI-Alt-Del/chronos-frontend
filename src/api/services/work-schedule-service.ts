import type { IApiClient } from '@/@core/global/interfaces/api-client'
import type { WorkdayLogDto } from '@/@core/work-schedule/dtos'
import type { IWorkScheduleService } from '@/@core/work-schedule/interfaces'
import { DatetimeProvider } from '@/providers'

export const WorkScheduleService = (apiClient: IApiClient): IWorkScheduleService => {
  const MODULE = '/work-schedule'

  return {
    async listWorkSchedules() {
      return await apiClient.get(`${MODULE}/schedules`)
    },

    async getWorkSchedule(workScheduleId) {
      return await apiClient.get(`${MODULE}/schedules/${workScheduleId}`)
    },

    async getTodayWorkdayLog(collaboratorId) {
      return await apiClient.get<WorkdayLogDto>(
        `${MODULE}/workday-logs/${collaboratorId}/today`,
      )
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

    async editWorkScheduleDescription(workScheduleId, description) {
      return await apiClient.patch(`${MODULE}/schedules/${workScheduleId}/description`, {
        description,
      })
    },

    async editDaysOffSchedule(
      workScheduleId,
      workdaysCount: number,
      daysOffCount: number,
      daysOff,
    ) {
      return await apiClient.put(
        `${MODULE}/schedules/${workScheduleId}/days-off-schedule`,
        {
          workdaysCount,
          daysOffCount,
          daysOff,
        },
      )
    },

    async editWeekSchedule(workScheduleId, weekSchedule) {
      return await apiClient.put(
        `${MODULE}/schedules/${workScheduleId}/week-schedule`,
        weekSchedule,
      )
    },

    async editTimePunchSchedule(timePunch) {
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
      return await apiClient.get(`${MODULE}/schedules/days-off-schedule`)
    },

    async deleteWorkSchedule(workScheduleId) {
      return await apiClient.delete(`${MODULE}/schedules/${workScheduleId}`)
    },
  }
}

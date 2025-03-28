import type { IApiClient } from '@/@core/global/interfaces/api-client'
import type { WorkdayLogDto } from '@/@core/work-schedule/dtos'
import type { IWorkScheduleService } from '@/@core/work-schedule/interfaces'
import { DatetimeProvider } from '@/providers'

export const WorkScheduleService = (apiClient: IApiClient): IWorkScheduleService => {
  const MODULE = '/work-schedule'

  return {
    async listWorkSchedules(page = 1) {
      apiClient.setParam('page', String(page))
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
      apiClient.setParam('date', String(date.toISOString().split('T')[0]))
      apiClient.setParam('page', String(page))
      return await apiClient.get(`${MODULE}/workday-logs/history`)
    },

    async reportCollaboratorHistory(collaboratorId, startDate, endDate, page = 1) {
      apiClient.setParam('collaboratorId', String(collaboratorId))
      apiClient.setParam('startDate', String(startDate.toISOString().split('T')[0]))
      apiClient.setParam('endDate', String(endDate.toISOString().split('T')[0]))
      apiClient.setParam('page', String(page))
      return await apiClient.get(`${MODULE}/workday-logs/history/collaborators`)
    },

    async createWorkSchedule(workSchedule) {
      return await apiClient.post(`${MODULE}/schedules`, workSchedule)
    },

    async editTimePunchSchedule(timePunchScheduleId, timePunch) {
      return await apiClient.put(
        `${MODULE}/time-punches/${timePunchScheduleId}`,
        timePunch,
      )
    },

    async punchTime(timePunchLogId, time) {
      const datetimeProvider = DatetimeProvider()
      return await apiClient.patch(`${MODULE}/time-punches/${timePunchLogId}`, {
        time: datetimeProvider.formatTime(time),
      })
    },

    async deleteWorkSchedule(workScheduleId) {
      return await apiClient.delete(`${MODULE}/schedules/${workScheduleId}`)
    },
  }
}

import type { IApiClient } from '@/@core/global/interfaces/api-client'
import type { IWorkScheduleService } from '@/@core/work-schedule/interfaces'

export const WorkScheduleService = (apiClient: IApiClient): IWorkScheduleService => {
  return {
    async listWorkSchedules(page = 1) {
      apiClient.setParam('page', String(page))
      return await apiClient.get('/work-schedule/schedules')
    },
  } as IWorkScheduleService
}

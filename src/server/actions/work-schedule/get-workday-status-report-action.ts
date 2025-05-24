import type { Action } from '@/@core/global/interfaces/rpc'
import type { WorkdayStatusReportDto } from '@/@core/work-schedule/dtos'
import type { WorkScheduleService } from '@/@core/work-schedule/interfaces'

type Response = WorkdayStatusReportDto

export const GetWorkdayStatusReportAction = (
  service: WorkScheduleService,
): Action<void, Response> => {
  return {
    async handle() {
      const response = await service.getWorkdayStatusReport()
      if (response.isFailure) response.throwError()

      return response.body
    },
  }
}

import type { Action } from '@/@core/global/interfaces/rpc'
import type { DailyPunchsReportDto } from '@/@core/work-schedule/dtos'
import type { WorkScheduleService } from '@/@core/work-schedule/interfaces'

type Request = {
  startDate?: string
  endDate?: string
}

type Response = {
  report: DailyPunchsReportDto
}

export const GetDailyPunchsReportAction = (
  service: WorkScheduleService,
): Action<Request, Response> => {
  return {
    async handle(call) {
      const { startDate, endDate } = call.getRequest()
      const response = await service.getDailyPunchsReport(startDate, endDate)
      if (response.isFailure) response.throwError()

      return {
        report: response.body,
      }
    },
  }
}

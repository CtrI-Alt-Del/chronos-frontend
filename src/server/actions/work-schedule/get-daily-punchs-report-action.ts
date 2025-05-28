import type { Action } from '@/@core/global/interfaces/rpc'
import type { DailyPunchsReportDto } from '@/@core/work-schedule/dtos'
import type { WorkScheduleService } from '@/@core/work-schedule/interfaces'

type Request = {
  date?: string
}

type Response = {
  report: DailyPunchsReportDto
}

export const GetDailyPunchsReportAction = (
  service: WorkScheduleService,
): Action<Request, Response> => {
  return {
    async handle(call) {
      const { date } = call.getRequest()
      const response = await service.getDailyPunchsReport(date)
      if (response.isFailure) response.throwError()

      return {
        report: response.body,
      }
    },
  }
}

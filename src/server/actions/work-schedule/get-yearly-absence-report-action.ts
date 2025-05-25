import type { Action } from '@/@core/global/interfaces/rpc'
import type { YearlyAbsenceReportDto } from '@/@core/work-schedule/dtos'
import type { WorkScheduleService } from '@/@core/work-schedule/interfaces'

type Request = {
  startDate?: string
  endDate?: string
}

type Response = {
  report: YearlyAbsenceReportDto
}

export const GetYearlyAbsenceReportAction = (
  service: WorkScheduleService,
): Action<Request, Response> => {
  return {
    async handle(call) {
      const { startDate, endDate } = call.getRequest()
      const response = await service.getYearlyAbsenceReport(startDate, endDate)
      if (response.isFailure) response.throwError()

      return {
        report: response.body,
      }
    },
  }
}

import type { Action } from '@/@core/global/interfaces/rpc'
import type { CollaboratorsMissingTimeReportDto } from '@/@core/work-schedule/dtos'
import type { WorkScheduleService } from '@/@core/work-schedule/interfaces'

type Request = {
  startDate?: string
  endDate?: string
}

type Response = {
  report: CollaboratorsMissingTimeReportDto
}

export const GetCollaboratorsMissingTimeReportAction = (
  service: WorkScheduleService,
): Action<Request, Response> => {
  return {
    async handle(call) {
      const { startDate, endDate } = call.getRequest()
      const response = await service.getCollaboratorsMissingTimeReport(startDate, endDate)
      if (response.isFailure) response.throwError()

      return {
        report: response.body,
      }
    },
  }
}

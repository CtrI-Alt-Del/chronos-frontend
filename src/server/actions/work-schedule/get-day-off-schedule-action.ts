import type { IAction, IActionServer } from '@/@core/global/interfaces'
import type { DayOffScheduleDto } from '@/@core/work-schedule/dtos'
import type { IWorkScheduleService } from '@/@core/work-schedule/interfaces'

type Request = {
  collaboratorId: string
}

type Response = {
  dayOffSchedule: DayOffScheduleDto
}

export const GetDayOffScheduleAction = (
  service: IWorkScheduleService,
): IAction<Request, Response> => {
  return {
    async handle(actionServer: IActionServer<Request>) {
      const { collaboratorId } = actionServer.getRequest()
      const response = await service.getDayOffSchedule(collaboratorId)
      if (response.isFailure) response.throwError()

      return {
        dayOffSchedule: response.body,
      }
    },
  }
}

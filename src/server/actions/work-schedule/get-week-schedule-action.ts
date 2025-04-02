import type { IAction, IActionServer } from '@/@core/global/interfaces'
import type { WeekdayScheduleDto } from '@/@core/work-schedule/dtos'
import type { IWorkScheduleService } from '@/@core/work-schedule/interfaces'

type Request = {
  collaboratorId: string
}

type Response = {
  weekSchedule: WeekdayScheduleDto[]
}

export const GetWeekScheduleAction = (
  service: IWorkScheduleService,
): IAction<Request, Response> => {
  return {
    async handle(actionServer: IActionServer<Request>) {
      const { collaboratorId } = actionServer.getRequest()
      const response = await service.getWeekSchedule(collaboratorId)
      if (response.isFailure) response.throwError()

      return {
        weekSchedule: response.body,
      }
    },
  }
}

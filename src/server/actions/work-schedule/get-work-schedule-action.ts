import type { IAction } from '@/@core/global/interfaces/action'
import type { IActionServer } from '@/@core/global/interfaces/action-server'
import type { WorkScheduleDto } from '@/@core/work-schedule/dtos'
import type { IWorkScheduleService } from '@/@core/work-schedule/interfaces'

type Request = {
  workScheduleId: string
}

type Response = {
  workSchedule: WorkScheduleDto
}

export const GetWorkScheduleAction = (
  service: IWorkScheduleService,
): IAction<Request, Response> => {
  return {
    async handle(actionServer: IActionServer<Request>) {
      const { workScheduleId } = actionServer.getRequest()
      const response = await service.getWorkSchedule(workScheduleId)
      if (response.isFailure) response.throwError()

      return {
        workSchedule: response.body,
      }
    },
  }
}

import { CACHE } from '@/@core/global/constants'
import type { IAction } from '@/@core/global/interfaces/action'
import type { IActionServer } from '@/@core/global/interfaces/action-server'
import type { WeekdayScheduleDto } from '@/@core/work-schedule/dtos'
import type { IWorkScheduleService } from '@/@core/work-schedule/interfaces'

type Request = {
  collaboratorId: string
  weekSchedule: WeekdayScheduleDto[]
}

export const UpdateWeekScheduleAction = (
  service: IWorkScheduleService,
): IAction<Request> => {
  return {
    async handle(actionServer: IActionServer<Request>) {
      const { collaboratorId, weekSchedule } = actionServer.getRequest()
      const response = await service.updateWeekSchedule(collaboratorId, weekSchedule)
      if (response.isFailure) response.throwError()
      actionServer.resetCache(CACHE.workSchedule.weekSchedule.key(collaboratorId))
    },
  }
}

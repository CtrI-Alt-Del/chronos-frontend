import { CACHE } from '@/@core/global/constants'
import type { IAction } from '@/@core/global/interfaces/action'
import type { IActionServer } from '@/@core/global/interfaces/action-server'
import type { TimePunchDto, WeekdayScheduleDto } from '@/@core/work-schedule/dtos'
import type { IWorkScheduleService } from '@/@core/work-schedule/interfaces'

type Request = {
  workScheduleId: string
  weekSchedule: WeekdayScheduleDto[]
}

export const EditWeekScheduleAction = (
  service: IWorkScheduleService,
): IAction<Request> => {
  return {
    async handle(actionServer: IActionServer<Request>) {
      const { workScheduleId, weekSchedule } = actionServer.getRequest()
      const response = await service.editWeekSchedule(workScheduleId, weekSchedule)
      if (response.isFailure) response.throwError()
      actionServer.resetCache(CACHE.workSchedule.schedule.key(workScheduleId))
    },
  }
}

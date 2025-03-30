import { CACHE } from '@/@core/global/constants'
import type { IAction } from '@/@core/global/interfaces/action'
import type { IActionServer } from '@/@core/global/interfaces/action-server'
import type { TimePunchDto } from '@/@core/work-schedule/dtos'
import type { IWorkScheduleService } from '@/@core/work-schedule/interfaces'

type Request = {
  workScheduleId: string
  timePunchesSchedule: TimePunchDto[]
}

export const EditWeekScheduleAction = (
  service: IWorkScheduleService,
): IAction<Request> => {
  return {
    async handle(actionServer: IActionServer<Request>) {
      const { workScheduleId, timePunchesSchedule } = actionServer.getRequest()
      const response = await service.editWeekSchedule(timePunchesSchedule)
      if (response.isFailure) response.throwError()
      actionServer.resetCache(CACHE.workSchedule.schedule.key(workScheduleId))
    },
  }
}

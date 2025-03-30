import { CACHE } from '@/@core/global/constants'
import type { IAction } from '@/@core/global/interfaces/action'
import type { IActionServer } from '@/@core/global/interfaces/action-server'
import type { TimePunchDto } from '@/@core/work-schedule/dtos'
import type { IWorkScheduleService } from '@/@core/work-schedule/interfaces'

type Request = {
  workScheduleId: string
  timePunchScheduleId: string
  timePunchSchedule: Omit<TimePunchDto, 'id'>
}

export const EditTimeScheduleAction = (
  service: IWorkScheduleService,
): IAction<Request> => {
  return {
    async handle(actionServer: IActionServer<Request>) {
      const { workScheduleId, timePunchScheduleId, timePunchSchedule } =
        actionServer.getRequest()

      const timePunchScheduleDto = {
        id: timePunchScheduleId,
        ...timePunchSchedule,
      }
      const response = await service.editTimePunchSchedule(timePunchScheduleDto)
      if (response.isFailure) response.throwError()
      actionServer.resetCache(CACHE.workSchedule.schedule.key(workScheduleId))
    },
  }
}

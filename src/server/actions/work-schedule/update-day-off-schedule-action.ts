import { CACHE } from '@/@core/global/constants'
import type { IAction } from '@/@core/global/interfaces/action'
import type { IActionServer } from '@/@core/global/interfaces/action-server'
import type { DayOffScheduleDto } from '@/@core/work-schedule/dtos'
import type { IWorkScheduleService } from '@/@core/work-schedule/interfaces'

type Request = {
  collaboratorId: string
  dayOffSchedule: DayOffScheduleDto
}

export const UpdateDayOffAction = (service: IWorkScheduleService): IAction<Request> => {
  return {
    async handle(actionServer: IActionServer<Request>) {
      const { collaboratorId, dayOffSchedule } = actionServer.getRequest()
      const response = await service.updateDayOffSchedule(collaboratorId, dayOffSchedule)
      if (response.isFailure) response.throwError()
      actionServer.resetCache(CACHE.workSchedule.dayOffSchedule.key(collaboratorId))
    },
  }
}

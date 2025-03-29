import { CACHE } from '@/@core/global/constants'
import type { IAction } from '@/@core/global/interfaces/action'
import type { IActionServer } from '@/@core/global/interfaces/action-server'
import type { IWorkScheduleService } from '@/@core/work-schedule/interfaces'

type Request = {
  workScheduleId: string
  daysOffSchedule: Date[]
}

export const EditDaysOffAction = (service: IWorkScheduleService): IAction<Request> => {
  return {
    async handle(actionServer: IActionServer<Request>) {
      const { workScheduleId, daysOffSchedule } = actionServer.getRequest()
      const response = await service.editDaysOffSchedule(workScheduleId, daysOffSchedule)
      if (response.isFailure) response.throwError()
      actionServer.resetCache(CACHE.workSchedule.schedule.key(workScheduleId))
    },
  }
}

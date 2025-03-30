import { CACHE } from '@/@core/global/constants'
import type { IAction } from '@/@core/global/interfaces/action'
import type { IActionServer } from '@/@core/global/interfaces/action-server'
import type { IWorkScheduleService } from '@/@core/work-schedule/interfaces'

type Request = {
  workScheduleId: string
  description: string
}

export const EditWorkScheduleDescriptionAction = (
  service: IWorkScheduleService,
): IAction<Request> => {
  return {
    async handle(actionServer: IActionServer<Request>) {
      const { workScheduleId, description } = actionServer.getRequest()
      const response = await service.editWorkScheduleDescription(
        workScheduleId,
        description,
      )
      if (response.isFailure) response.throwError()
      actionServer.resetCache(CACHE.workSchedule.schedule.key(workScheduleId))
    },
  }
}

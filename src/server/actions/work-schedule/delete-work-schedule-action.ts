import { CACHE } from '@/@core/global/constants'
import type { IAction } from '@/@core/global/interfaces/action'
import type { IActionServer } from '@/@core/global/interfaces/action-server'
import type { IWorkScheduleService } from '@/@core/work-schedule/interfaces'
import { ROUTES } from '@/constants/routes'

type Request = {
  workScheduleId: string
}

export const DeleteWorkScheduleAction = (
  service: IWorkScheduleService,
): IAction<Request> => {
  return {
    async handle(actionServer: IActionServer<Request>) {
      const { workScheduleId } = actionServer.getRequest()
      const response = await service.deleteWorkSchedule(workScheduleId)
      if (response.isFailure) response.throwError()
      actionServer.resetCache(CACHE.workSchedule.schedule.key(workScheduleId))
      actionServer.redirect(ROUTES.workSchedule.schedules)
    },
  }
}

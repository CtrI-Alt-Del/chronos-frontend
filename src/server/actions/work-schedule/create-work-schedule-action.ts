import type { IAction } from '@/@core/global/interfaces/action'
import type { IActionServer } from '@/@core/global/interfaces/action-server'
import type { WorkScheduleDto } from '@/@core/work-schedule/dtos'
import type { IWorkScheduleService } from '@/@core/work-schedule/interfaces'
import { ROUTES } from '@/constants/routes'

type Request = WorkScheduleDto

export const CreateWorkScheduleAction = (
  service: IWorkScheduleService,
): IAction<Request> => {
  return {
    async handle(actionServer: IActionServer<Request>) {
      const workSchedule = actionServer.getRequest()
      const response = await service.createWorkSchedule(workSchedule)
      if (response.isFailure) response.throwError()
      actionServer.redirect(ROUTES.workSchedule.schedules)
    },
  }
}

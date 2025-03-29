import type { IAction } from '@/@core/global/interfaces/action'
import type { IActionServer } from '@/@core/global/interfaces/action-server'
import type { TimePunchDto } from '@/@core/work-schedule/dtos'
import type { IWorkScheduleService } from '@/@core/work-schedule/interfaces'
import { ROUTES } from '@/constants/routes'

type Request = {
  timePunchSchedule: Omit<TimePunchDto, 'id'>
  daysOffSchedule: Date[]
}

export const CreateWorkScheduleAction = (
  service: IWorkScheduleService,
): IAction<Request> => {
  return {
    async handle(actionServer: IActionServer<Request>) {
      const { timePunchSchedule, daysOffSchedule } = actionServer.getRequest()
      const response = await service.createWorkSchedule(
        timePunchSchedule,
        daysOffSchedule,
      )
      if (response.isFailure) response.throwError()
      actionServer.redirect(ROUTES.workSchedule.schedules)
    },
  }
}

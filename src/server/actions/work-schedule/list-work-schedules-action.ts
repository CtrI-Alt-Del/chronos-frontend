import type { IAction } from '@/@core/global/interfaces/action'
import type { IActionServer } from '@/@core/global/interfaces/action-server'
import type { WorkScheduleDto } from '@/@core/work-schedule/dtos'
import type { IWorkScheduleService } from '@/@core/work-schedule/interfaces'

type Response = {
  workSchedules: WorkScheduleDto[]
}

export const ListWorkSchedulesAction = (
  service: IWorkScheduleService,
): IAction<void, Response> => {
  return {
    async handle(_: IActionServer<void>) {
      const response = await service.listWorkSchedules()
      if (response.isFailure) response.throwError()

      return {
        workSchedules: response.body,
      }
    },
  }
}

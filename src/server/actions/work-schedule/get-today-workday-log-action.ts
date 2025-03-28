import type { IAction } from '@/@core/global/interfaces/action'
import type { IActionServer } from '@/@core/global/interfaces/action-server'
import type { WorkdayLogDto } from '@/@core/work-schedule/dtos'
import type { IWorkScheduleService } from '@/@core/work-schedule/interfaces'

type Response = {
  workdayLog: WorkdayLogDto
}

export const GetTodayWorkdayLogAction = (
  service: IWorkScheduleService,
): IAction<void, Response> => {
  return {
    async handle(actionServer: IActionServer) {
      const account = await actionServer.getAccount()
      const response = await service.getTodayWorkdayLog(account.collaboratorId)
      if (response.isFailure) response.throwError()

      return {
        workdayLog: response.body,
      }
    },
  }
}

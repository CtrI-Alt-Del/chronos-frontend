import type { Action, Call } from '@/@core/global/interfaces/rpc'
import type { WorkdayLogDto } from '@/@core/work-schedule/dtos'
import type { WorkScheduleService } from '@/@core/work-schedule/interfaces'

type Response = {
  workdayLog: WorkdayLogDto
}

export const GetTodayWorkdayLogAction = (
  service: WorkScheduleService,
): Action<void, Response> => {
  return {
    async handle(actionServer: Call) {
      const account = await actionServer.getAccount()
      const response = await service.getTodayWorkdayLog(account.collaboratorId)
      if (response.isFailure) response.throwError()

      return {
        workdayLog: response.body,
      }
    },
  }
}

import { CACHE } from '@/@core/global/constants'
import type { IAction } from '@/@core/global/interfaces/action'
import type { IActionServer } from '@/@core/global/interfaces/action-server'
import type { IWorkScheduleService } from '@/@core/work-schedule/interfaces'

type Request = {
  timePunchLogId: string
  time: Date
}

export const PunchTimeAction = (service: IWorkScheduleService): IAction<Request> => {
  return {
    async handle(actionServer: IActionServer<Request>) {
      const account = await actionServer.getAccount()
      const { timePunchLogId, time } = actionServer.getRequest()
      const response = await service.punchTime(timePunchLogId, time)
      if (response.isFailure) response.throwError()
      actionServer.resetCache(CACHE.workSchedule.todayWordayLog.key(account.id))
    },
  }
}

import { CACHE } from '@/@core/global/constants'
import type { Action } from '@/@core/global/interfaces/rpc/action'
import type { Call } from '@/@core/global/interfaces/rpc/call'
import type { WorkScheduleService } from '@/@core/work-schedule/interfaces'

type Request = {
  workdayLogId: string
  time: string
}

export const PunchTimeAction = (service: WorkScheduleService): Action<Request> => {
  return {
    async handle(call: Call<Request>) {
      const account = await call.getAccount()
      const { workdayLogId, time } = call.getRequest()
      const response = await service.punchTime(workdayLogId, time)
      if (response.isFailure) response.throwError()
      call.resetCache(CACHE.workSchedule.todayWordayLog.key(account.id))
    },
  }
}

import { CACHE } from '@/@core/global/constants'
import type { Action, Call } from '@/@core/global/interfaces/rpc'
import type { DayOffScheduleDto } from '@/@core/work-schedule/dtos'
import type { WorkScheduleService } from '@/@core/work-schedule/interfaces'

type Request = {
  collaboratorId: string
  dayOffSchedule: DayOffScheduleDto
}

export const UpdateDayOffAction = (service: WorkScheduleService): Action<Request> => {
  return {
    async handle(call: Call<Request>) {
      const { collaboratorId, dayOffSchedule } = call.getRequest()
      const response = await service.updateDayOffSchedule(collaboratorId, dayOffSchedule)
      if (response.isFailure) response.throwError()
      call.resetCache(CACHE.workSchedule.dayOffSchedule.key(collaboratorId))
    },
  }
}

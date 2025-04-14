import { CACHE } from '@/@core/global/constants'
import type { Action, Call } from '@/@core/global/interfaces/rpc'
import type { DayOffScheduleDto } from '@/@core/work-schedule/dtos'
import type { WorkScheduleService } from '@/@core/work-schedule/interfaces'

type Request = {
  dayOffScheduleId: string
  dayOffScheduleDto: DayOffScheduleDto
}

export const UpdateDaysOffScheduleAction = (
  service: WorkScheduleService,
): Action<Request> => {
  return {
    async handle(call: Call<Request>) {
      const { dayOffScheduleId, dayOffScheduleDto } = call.getRequest()
      dayOffScheduleDto.id = dayOffScheduleId
      const response = await service.updateDayOffSchedule(dayOffScheduleDto)
      if (response.isFailure) response.throwError()
      call.resetCache(CACHE.workSchedule.dayOffSchedule.key(dayOffScheduleId))
    },
  }
}

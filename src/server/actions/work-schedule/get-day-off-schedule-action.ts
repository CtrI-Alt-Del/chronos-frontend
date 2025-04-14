import type { Action, Call } from '@/@core/global/interfaces/rpc'
import type { DayOffScheduleDto } from '@/@core/work-schedule/dtos'
import type { WorkScheduleService } from '@/@core/work-schedule/interfaces'

type Request = {
  collaboratorId: string
}

type Response = {
  dayOffSchedule: DayOffScheduleDto
}

export const GetDayOffScheduleAction = (
  service: WorkScheduleService,
): Action<Request, Response> => {
  return {
    async handle(call: Call<Request>) {
      const { collaboratorId } = call.getRequest()
      const response = await service.getDayOffSchedule(collaboratorId)
      if (response.isFailure) response.throwError()

      return {
        dayOffSchedule: response.body,
      }
    },
  }
}

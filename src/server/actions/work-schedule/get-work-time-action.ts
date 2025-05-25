import type { Action } from '@/@core/global/interfaces/rpc'
import type { WorkTimeDto } from '@/@core/work-schedule/dtos'
import type { WorkScheduleService } from '@/@core/work-schedule/interfaces'

type Request = {
  collaboratorId: string
}

type Response = {
  workTime: WorkTimeDto
}

export const GetWorkTimeAction = (
  service: WorkScheduleService,
): Action<Request, Response> => {
  return {
    async handle(call) {
      const { collaboratorId } = call.getRequest()
      const response = await service.getWorkTime(collaboratorId)
      if (response.isFailure) response.throwError()

      return {
        workTime: response.body,
      }
    },
  }
}

import type { Action, Call } from '@/@core/global/interfaces/rpc'
import type { TimeCardDto } from '@/@core/work-schedule/dtos/time-card-dto'
import type { WorkScheduleService } from '@/@core/work-schedule/interfaces'

type Request = {
  collaboratorId: string
}

type Response = TimeCardDto

export const GetTimeCardAction = (
  service: WorkScheduleService,
): Action<Request, Response> => {
  return {
    async handle(call: Call<Request>) {
      const { collaboratorId } = call.getRequest()
      const response = await service.getTimeCard(collaboratorId)
      if (response.isFailure) response.throwError()
      return response.body
    },
  }
}

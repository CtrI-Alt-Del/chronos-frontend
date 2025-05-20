import type { HourBankService } from '@/@core/hour-bank/interfaces'
import type { Action, Call } from '@/@core/global/interfaces/rpc'

type Request = {
  collaboratorId: string
}

type Response = {
  success: boolean
}

export const CreatePaidOvertimeAction = (
  service: HourBankService,
): Action<Request, Response> => {
  return {
    async handle(call: Call<Request>) {
      const { collaboratorId } = call.getRequest()
      const response = await service.createPaidOvertime(collaboratorId)
      if (response.isFailure) response.throwError()
      return { success: true }
    },
  }
}

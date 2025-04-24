import type { HourBankService } from '@/@core/hour-bank/interfaces'
import type { Action, Call } from '@/@core/global/interfaces/rpc'

type Request = {
  collaboratorId: string
}

export const CreateHourBankTransactionAdjustment = (
  service: HourBankService,
): Action<Request> => {
  return {
    async handle(call: Call<Request>) {
      const { collaboratorId } = call.getRequest()
      const response = await service.createHourBankTransactionAdjustment(collaboratorId)
      if (response.isFailure) response.throwError()
    },
  }
}

import type { HourBankService } from '@/@core/hour-bank/interfaces'
import type { Action, Call } from '@/@core/global/interfaces/rpc'
import { CACHE } from '@/@core/global/constants'

type Request = {
  collaboratorId: string
  transactionTime: string
  transactionOperation: string
}

export const CreateHourBankTransactionAdjustmentAction = (
  service: HourBankService,
): Action<Request> => {
  return {
    async handle(call: Call<Request>) {
      const { collaboratorId, transactionTime, transactionOperation } = call.getRequest()
      const response = await service.createHourBankTransactionAdjustment(
        collaboratorId,
        transactionTime,
        transactionOperation,
      )
      if (response.isFailure) response.throwError()
      call.resetCache(CACHE.hourBank.key(collaboratorId))
    },
  }
}

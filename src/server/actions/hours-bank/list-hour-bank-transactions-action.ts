import type { HourBankService } from '@/@core/hour-bank/interfaces'
import type { Action, Call } from '@/@core/global/interfaces/rpc'
import type { HourBankTransactionDto } from '@/@core/hour-bank/dtos'

type Request = {
  collaboratorId: string
}

type Response = HourBankTransactionDto[]

export const ListHourBankTransactionsAction = (
  service: HourBankService,
): Action<Request, Response> => {
  return {
    async handle(call: Call<Request>) {
      const { collaboratorId } = call.getRequest()
      const response = await service.listHourBankTransactions(collaboratorId)
      if (response.isFailure) response.throwError()
      return response.body.items
    },
  }
}

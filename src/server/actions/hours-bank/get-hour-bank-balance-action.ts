import type { HourBankBalanceDto } from '@/@core/hour-bank/dtos/hour-bank-balance-dto'
import type { HourBankService } from '@/@core/hour-bank/interfaces'
import type { Action, Call } from '@/@core/global/interfaces/rpc'

type Request = {
  collaboratorId: string
}

type Response = {
  hourBankBalance: HourBankBalanceDto
}

export const GetHourBankBalanceAction = (
  service: HourBankService,
): Action<Request, Response> => {
  return {
    async handle(call: Call<Request>) {
      const { collaboratorId } = call.getRequest()
      const response = await service.getHourBankBalance(collaboratorId)
      if (response.isFailure) response.throwError()

      return {
        hourBankBalance: response.body,
      }
    },
  }
}

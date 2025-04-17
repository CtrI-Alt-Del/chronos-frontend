import type { RestClient } from '@/@core/global/interfaces/rest/rest-client'
import type { HourBankService as IHourBankService } from '@/@core/hour-bank/interfaces'
import type { PaginationResponse } from '@/@core/global/responses'
import type { HourBankBalance, HourBankTransactionDto } from '@/@core/hour-bank/dtos'

export const HourBankService = (restClient: RestClient): IHourBankService => {
  const MODULE = '/hout-bank'

  return {
    async createHourBankTansactionAdjustment(collaboratorId: string) {
      return await restClient.post(`${MODULE}/hour-bank/${collaboratorId}/transactions`)
    },

    async listHourBankTransactions(collaboratorId: string) {
      return await restClient.get<PaginationResponse<HourBankTransactionDto>>(
        `${MODULE}/hour-bank/${collaboratorId}/transactions`,
      )
    },

    async calculateHourBankBalance(collaboratorId: string) {
      return await restClient.get<PaginationResponse<HourBankBalance>>(
        `${MODULE}/hour-bank/${collaboratorId}/balance`,
      )
    },
  }
}

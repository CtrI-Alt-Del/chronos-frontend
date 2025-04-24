import type { RestClient } from '@/@core/global/interfaces/rest/rest-client'
import type { HourBankService as IHourBankService } from '@/@core/hour-bank/interfaces'
import type { PaginationResponse } from '@/@core/global/responses'
import type { HourBankBalance, HourBankTransactionDto } from '@/@core/hour-bank/dtos'

export const HourBankService = (restClient: RestClient): IHourBankService => {
  const MODULE = '/hour-bank'

  return {
    async createHourBankTransactionAdjustment(collaboratorId: string) {
      return await restClient.post(`${MODULE}/${collaboratorId}/transactions`)
    },

    async listHourBankTransactions(
      collaboratorId: string,
      startDate: string,
      endDate: string,
      operation: string,
      page: number,
    ) {
      restClient.setParam('startDate', startDate)
      restClient.setParam('endDate', endDate)
      restClient.setParam('operation', operation)
      restClient.setParam('page', String(page))
      return await restClient.get<PaginationResponse<HourBankTransactionDto>>(
        `${MODULE}/${collaboratorId}/transactions`,
      )
    },

    async calculateHourBankBalance(collaboratorId: string) {
      return await restClient.get(
        `${MODULE}/${collaboratorId}/balance`,
      )
    },
  }
}

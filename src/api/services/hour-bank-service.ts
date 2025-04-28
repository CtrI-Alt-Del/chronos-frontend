import type { RestClient } from '@/@core/global/interfaces/rest/rest-client'
import type { HourBankService as IHourBankService } from '@/@core/hour-bank/interfaces'
import type { PaginationResponse } from '@/@core/global/responses'
import type { HourBankTransactionDto } from '@/@core/hour-bank/dtos'

export const HourBankService = (restClient: RestClient): IHourBankService => {
  const MODULE = '/hour-bank'

  return {
    async createHourBankTransactionAdjustment(
      collaboratorId: string,
      transactionTime: string,
      transactionOperation: string,
    ) {
      return await restClient.post(
        `${MODULE}/${collaboratorId}/transactions/adjustment`,
        {
          time: transactionTime,
          operation: transactionOperation,
        },
      )
    },

    async listHourBankTransactions(
      collaboratorId: string,
      startDate: string,
      endDate: string,
      operation: string,
      page: number,
    ) {
      if (startDate) restClient.setParam('startDate', startDate)
      if (endDate) restClient.setParam('endDate', endDate)
      if (operation) restClient.setParam('operation', operation)
      if (page) restClient.setParam('page', String(page))
      return await restClient.get<PaginationResponse<HourBankTransactionDto>>(
        `${MODULE}/${collaboratorId}/transactions`,
        `${MODULE}/${collaboratorId}/transactions`,
      )
    },

    async getHourBankBalance(collaboratorId: string) {
      return await restClient.get(`${MODULE}/${collaboratorId}/balance`)
    },
  }
}

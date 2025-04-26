import type { ApiResponse, PaginationResponse } from '../../global/responses'
import type { HourBankBalanceDto, HourBankTransactionDto } from '../dtos'

export interface HourBankService {
  createHourBankTransactionAdjustment(
    collaboratorId: string,
    transactionTime: string,
    transactionOperation: string,
  ): Promise<ApiResponse<void>>
  listHourBankTransactions(
    collaboratorId: string,
    startDate?: string,
    endDate?: string,
    operation?: string,
    page?: number,
  ): Promise<ApiResponse<PaginationResponse<HourBankTransactionDto>>>
  getHourBankBalance(collaboratorId: string): Promise<ApiResponse<HourBankBalanceDto>>
}

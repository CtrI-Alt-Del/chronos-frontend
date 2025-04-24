import type { ApiResponse, PaginationResponse } from '../../global/responses'
import type { HourBankBalance, HourBankTransactionDto } from '../dtos'

export interface HourBankService {
  createHourBankTransactionAdjustment(collaboratorId: string): Promise<ApiResponse<void>>
  listHourBankTransactions(
    collaboratorId: string,
    startDate: string,
    endDate: string,
    operation: string,
    page: number,
  ): Promise<ApiResponse<PaginationResponse<HourBankTransactionDto>>>
  calculateHourBankBalance(
    collaboratorId: string,
  ): Promise<ApiResponse<HourBankBalance>>
}

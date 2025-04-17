import type { ApiResponse, PaginationResponse } from '../../global/responses'
import type { HourBankBalance, HourBankTransactionDto } from '../dtos'

export interface HourBankService {
  createHourBankTansactionAdjustment(collaboratorId: string): Promise<ApiResponse<void>>
  listHourBankTransactions(
    collaboratorId: string,
  ): Promise<ApiResponse<PaginationResponse<HourBankTransactionDto>>>
  calculateHourBankBalance(
    collaboratorId: string,
  ): Promise<ApiResponse<PaginationResponse<HourBankBalance>>>
}

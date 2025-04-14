import type { ApiResponse, PaginationResponse } from '@/@core/global/responses'
import type { SolicitationDto } from '../dtos/solicitation-dto'
import type { TimePunchLogAdjustmentSolicitationDto } from '../dtos/time-punch-log-adjustment-solicitation-dto'
import { DayOffScheduleAdjustmentSolicitationDto } from '../dtos'

export interface ISolicitationService {
  listSolicitations(): Promise<ApiResponse<SolicitationDto[]>>
  createDayOffScheduleAdjustmentSolicitation(
    solicitation: DayOffScheduleAdjustmentSolicitationDto,
  ): Promise<ApiResponse<void>>
  createTimePunchLogAdjustmentSolicitation(
    solicitation: TimePunchLogAdjustmentSolicitationDto,
  ): Promise<ApiResponse<void>>
  resolveSolicitation(
    solicitationId: string,
    action: 'APPROVED' | 'DENIED',
    solicitationType: "DAY_OFF_SCHEDULE" | "TIME_PUNCH"
  ): Promise<ApiResponse<void>>
}

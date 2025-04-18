import type { ApiResponse } from '@/@core/global/responses'
import type { SolicitationDto } from '../dtos/solicitation-dto'
import type {
  DayOffScheduleAdjustmentSolicitationDto,
  TimePunchLogAdjustmentSolicitationDto,
} from '../dtos'

export interface SolicitationService {
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
    solicitationType: 'DAY_OFF_SCHEDULE' | 'TIME_PUNCH',
  ): Promise<ApiResponse<void>>
}

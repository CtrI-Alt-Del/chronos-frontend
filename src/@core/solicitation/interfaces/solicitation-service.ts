import type { ApiResponse } from '@/@core/global/responses'
import type { SolicitationDto } from '../dtos/solicitation-dto'
import type { WorkScheduleAdjustmentSolicitationDto } from '../dtos/work-schedule-adjustment-solicitation-dto'
import type { TimePunchLogAdjustmentSolicitationDto } from '../dtos/time-punch-log-adjustment-solicitation-dto'

export interface SolicitationService {
  listSolicitations(): Promise<ApiResponse<SolicitationDto[]>>
  createWorkScheduleAdjustmentSolicitation(
    solicitation: WorkScheduleAdjustmentSolicitationDto,
  ): Promise<ApiResponse<void>>
  createTimePunchLogAdjustmentSolicitation(
    solicitation: TimePunchLogAdjustmentSolicitationDto,
  ): Promise<ApiResponse<void>>
  resolveSolicitation(
    solicitationId: string,
    action: 'APPROVED' | 'DENIED',
  ): Promise<ApiResponse<void>>
}

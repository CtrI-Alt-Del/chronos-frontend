import type { ApiResponse, PaginationResponse } from '@/@core/global/responses'
import type { SolicitationDto } from '../dtos/solicitation-dto'
import { WorkScheduleAdjustmentSolicitationDto } from '../dtos/work-schedule-adjustment-solicitation-dto'
import { TimepunchLogAdjustmentDto } from '../dtos/time-punch-log-adjustment-solicitation-dto'

export interface ISolicitationService {
  listSolicitations(): Promise<ApiResponse<SolicitationDto[]>>
  createWorkScheduleAdjustmentSolicitation(
    solicitation: WorkScheduleAdjustmentSolicitationDto,
  ): Promise<ApiResponse<void>>
  createTimePunchLogAdjustmentSolicitation(
    solicitation: TimepunchLogAdjustmentDto,
  ): Promise<ApiResponse<void>>
  resolveSolicitation(solicitationId:string,action: "APPROVED" | "DENIED"): Promise<ApiResponse<void>>
}

import type { ApiResponse, PaginationResponse } from '@/@core/global/responses'
import type { SolicitationDto } from '../dtos/solicitation-dto'
import type {
  DayOffScheduleAdjustmentSolicitationDto,
  JustificationTypeDto,
  PaidOvertimeSolicitationDto,
  TimePunchLogAdjustmentSolicitationDto,
} from '../dtos'

export interface PortalService {
  listSolicitations(): Promise<ApiResponse<SolicitationDto[]>>
  createDayOffScheduleAdjustmentSolicitation(
    solicitation: DayOffScheduleAdjustmentSolicitationDto,
  ): Promise<ApiResponse<void>>
  getJustificationAttachmentUrl(key: string): Promise<
    ApiResponse<{
      url: string
    }>
  >
  createDayOffSolicitation(
    dayOff: string,
    justificationTypeId: string,
    description: string,
    justificationTypeName: string,
    justificationTypeShouldHaveAttachment: string,
    attachment?: File,
  ): Promise<ApiResponse<void>>
  createTimePunchLogAdjustmentSolicitation(
    solicitation: TimePunchLogAdjustmentSolicitationDto,
  ): Promise<ApiResponse<void>>
  createPaidOvertimeSolicitation(): Promise<ApiResponse<void>>
  approvePaidOvertimeSolicitation(feedbackMessage?: string): Promise<ApiResponse<void>>
  denySolicitation(feedbackMessage?: string): Promise<ApiResponse<void>>
  resolveSolicitation(
    solicitationId: string,
    action: 'APPROVED' | 'DENIED',
    solicitationType: 'DAY_OFF_SCHEDULE' | 'TIME_PUNCH' | 'DAY_OFF',
  ): Promise<ApiResponse<void>>
  listPaidOvertimeSolicitations(
    page: number,
  ): Promise<ApiResponse<PaginationResponse<PaidOvertimeSolicitationDto>>>
  listJustificationTypes(): Promise<ApiResponse<JustificationTypeDto[]>>
  createJustificationType(
    justificationType: JustificationTypeDto,
  ): Promise<ApiResponse<JustificationTypeDto>>
  updateJustificationType(
    justificationType: JustificationTypeDto,
    id: string,
  ): Promise<ApiResponse<JustificationTypeDto>>
  deleteJustificationType(id: string): Promise<ApiResponse<void>>
}

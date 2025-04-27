import type { ApiResponse } from '@/@core/global/responses'
import type { SolicitationDto } from '../dtos/solicitation-dto'
import type {
  DayOffScheduleAdjustmentSolicitationDto,
  JustificationTypeDto,
  PaidOvertimeSolicitationDto,
  TimePunchLogAdjustmentSolicitationDto,
} from '../dtos'

export interface SolicitationService {
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
  resolveSolicitation(
    solicitationId: string,
    action: 'APPROVED' | 'DENIED',
    solicitationType: 'DAY_OFF_SCHEDULE' | 'TIME_PUNCH' | 'DAY_OFF',
  ): Promise<ApiResponse<void>>
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

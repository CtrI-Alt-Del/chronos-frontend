import type { ApiResponse, PaginationResponse } from '@/@core/global/responses'
import type {
  DayOffScheduleAdjustmentSolicitationDto,
  DayOffSolicitationDto,
  ExcusedAbsenceSolicitationDto,
  JustificationTypeDto,
  PaidOvertimeSolicitationDto,
  TimePunchLogAdjustmentSolicitationDto,
} from '../dtos'

export interface PortalService {
  createDayOffScheduleAdjustmentSolicitation(
    solicitation: DayOffScheduleAdjustmentSolicitationDto,
  ): Promise<ApiResponse<void>>
  attachJustificationToSolicitation(
    solicitationId:string,
    justificationTypeId:string,
    justificationTypeName:string,
    justificationTypeShouldHaveAttachment:string,
    description:string,
    attachment?: File
  ):Promise<ApiResponse<void>>
  getJustificationAttachmentUrl(key: string): Promise<
    ApiResponse<{
      url: string
    }>
  >
  createTimePunchLogAdjustmentSolicitation(
    solicitation: TimePunchLogAdjustmentSolicitationDto,
  ): Promise<ApiResponse<void>>
  createDayOffSolicitation(
    dayOff: string,
    observation?: string,
  ): Promise<ApiResponse<void>>
  approveDayOffSolicitation(
    solicitationId: string,
    feedbackMessage?: string,
  ): Promise<ApiResponse<void>>
  listDayOffSolicitations(
    page: number,
  ): Promise<ApiResponse<PaginationResponse<DayOffSolicitationDto>>>
  createPaidOvertimeSolicitation(): Promise<ApiResponse<void>>
  approvePaidOvertimeSolicitation(
    solicitationId: string,
    feedbackMessage?: string,
  ): Promise<ApiResponse<void>>
  listPaidOvertimeSolicitations(
    page: number,
  ): Promise<ApiResponse<PaginationResponse<PaidOvertimeSolicitationDto>>>
  createExcusedAbsenceSolicitation(absenceDate: string): Promise<ApiResponse<ExcusedAbsenceSolicitationDto>>
  approveExcusedAbsenceSolicitation(
    solicitationId: string,
    feedbackMessage?: string,
  ): Promise<ApiResponse<void>>
  listExcusedAbsenceSolicitations(
    page: number,
  ): Promise<ApiResponse<PaginationResponse<ExcusedAbsenceSolicitationDto>>>
  denySolicitation(
    solicitationId: string,
    feedbackMessage?: string,
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

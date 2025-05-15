import type { ApiResponse, PaginationResponse } from '@/@core/global/responses'
import type {
  DayOffScheduleAdjustmentSolicitationDto,
  DayOffSolicitationDto,
  ExcusedAbsenceSolicitationDto,
  JustificationTypeDto,
  PaidOvertimeSolicitationDto,
  TimePunchLogAdjustmentSolicitationDto,
  VacationSolicitationDto,
  WithdrawSolicitationDto,
} from '../dtos'
import type { DayOffScheduleDto } from '@/@core/work-schedule/dtos'

export interface PortalService {
  createDayOffScheduleAdjustmentSolicitation(
    dayOffSchedule: DayOffScheduleDto,
  ): Promise<ApiResponse<void>>
  attachJustificationToSolicitation(
    solicitationId: string,
    justificationTypeId: string,
    justificationTypeName: string,
    justificationTypeShouldHaveAttachment: string,
    description: string,
    attachment?: File,
  ): Promise<ApiResponse<void>>
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
    workload: number,
    observation?: string,
  ): Promise<ApiResponse<void>>
  approveVacationSolicitation(
    solicitationId: string,
    feedbackMessage?: string,
  ): Promise<ApiResponse<void>>
  approveWithdrawSolicitation(
    solicitationId: string,
    feedbackMessage?: string,
  ): Promise<ApiResponse<void>>
  approveDayOffSolicitation(
    solicitationId: string,
    feedbackMessage?: string,
  ): Promise<ApiResponse<void>>
  approveDayOffScheduleAdjustmentSolicitation(
    solicitationId: string,
    feedbackMessage?: string,
  ): Promise<ApiResponse<void>>
  listDayOffScheduleAdjustmentSolicitations(
    page: number,
  ): Promise<ApiResponse<PaginationResponse<DayOffScheduleAdjustmentSolicitationDto>>>
  listDayOffSolicitations(
    page: number,
  ): Promise<ApiResponse<PaginationResponse<DayOffSolicitationDto>>>
  listWithdrawSolicitations(
    page: number,
  ): Promise<ApiResponse<PaginationResponse<WithdrawSolicitationDto>>>
  listVacationSolicitations(
    page: number,
  ): Promise<ApiResponse<PaginationResponse<VacationSolicitationDto>>>
  createPaidOvertimeSolicitation(): Promise<ApiResponse<void>>
  approvePaidOvertimeSolicitation(
    solicitationId: string,
    feedbackMessage?: string,
  ): Promise<ApiResponse<void>>
  listPaidOvertimeSolicitations(
    page: number,
  ): Promise<ApiResponse<PaginationResponse<PaidOvertimeSolicitationDto>>>
  createWithdrawSolicitation(
    withdrawalDays: string[],
  ): Promise<ApiResponse<WithdrawSolicitationDto>>
  createExcusedAbsenceSolicitation(
    absenceDate: string,
  ): Promise<ApiResponse<ExcusedAbsenceSolicitationDto>>
  approveExcusedAbsenceSolicitation(
    solicitationId: string,
    feedbackMessage?: string,
  ): Promise<ApiResponse<void>>
  listExcusedAbsenceSolicitations(
    page: number,
  ): Promise<ApiResponse<PaginationResponse<ExcusedAbsenceSolicitationDto>>>
  cancelSolicitation(solicitationId: string): Promise<ApiResponse<void>>
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

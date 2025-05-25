import type { ApiResponse, PaginationResponse } from '@/@core/global/responses'
import type {
  DayOffScheduleAdjustmentSolicitationDto,
  DayOffSolicitationDto,
  ExcusedAbsenceSolicitationDto,
  JustificationTypeDto,
  TimePunchLogAdjustmentSolicitationDto,
  VacationSolicitationDto,
  WithdrawSolicitationDto,
  CollaboratorWorkLeaveDto,
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
  getWorkLeaveCalendar(
    year: number,
    month: number,
  ): Promise<ApiResponse<PaginationResponse<CollaboratorWorkLeaveDto>>>
  createTimePunchLogAdjustmentSolicitation(
    solicitation: TimePunchLogAdjustmentSolicitationDto,
  ): Promise<ApiResponse<void>>
  approveTimePunchLogAdjustmentSolicitation(
    solicitationId: string,
    feedbackMessage?: string,
  ): Promise<ApiResponse<void>>
  listTimePunchLogAdjustmentSolicitations(
    page: number,
  ): Promise<ApiResponse<PaginationResponse<TimePunchLogAdjustmentSolicitationDto>>>
  createDayOffSolicitation(
    dayOff: string,
    workload: number,
    observation?: string,
  ): Promise<ApiResponse<void>>
  listVacationSolicitations(
    page: number,
  ): Promise<ApiResponse<PaginationResponse<VacationSolicitationDto>>>
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

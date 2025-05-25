import type { ApiResponse, PaginationResponse } from '@/@core/global/responses'
import type {
  DayOffScheduleAdjustmentSolicitationDto,
  DayOffSolicitationDto,
  ExcusedAbsenceSolicitationDto,
  JustificationTypeDto,
  TimePunchLogAdjustmentSolicitationDto,
  CollaboratorWorkLeaveDto,
  WorkLeaveSolicitationDto,
} from '../dtos'
import type { DayOffScheduleDto } from '@/@core/work-schedule/dtos'

export interface PortalService {
  getWorkLeaveCalendar(
    year: number,
    month: number,
    collaboratorName?: string,
  ): Promise<ApiResponse<PaginationResponse<CollaboratorWorkLeaveDto>>>
  getJustificationAttachmentUrl(key: string): Promise<
    ApiResponse<{
      url: string
    }>
  >
  listJustificationTypes(): Promise<ApiResponse<JustificationTypeDto[]>>
  listDayOffScheduleAdjustmentSolicitations(
    page: number,
  ): Promise<ApiResponse<PaginationResponse<DayOffScheduleAdjustmentSolicitationDto>>>
  listDayOffSolicitations(
    page: number,
  ): Promise<ApiResponse<PaginationResponse<DayOffSolicitationDto>>>
  listTimePunchLogAdjustmentSolicitations(
    page: number,
  ): Promise<ApiResponse<PaginationResponse<TimePunchLogAdjustmentSolicitationDto>>>
  listExcusedAbsenceSolicitations(
    page: number,
  ): Promise<ApiResponse<PaginationResponse<ExcusedAbsenceSolicitationDto>>>
  listVacationSolicitations(
    page: number,
  ): Promise<ApiResponse<PaginationResponse<WorkLeaveSolicitationDto>>>
  listWithdrawSolicitations(
    page: number,
  ): Promise<ApiResponse<PaginationResponse<WorkLeaveSolicitationDto>>>
  createDayOffScheduleAdjustmentSolicitation(
    dayOffSchedule: DayOffScheduleDto,
  ): Promise<ApiResponse<void>>
  createTimePunchLogAdjustmentSolicitation(
    solicitation: TimePunchLogAdjustmentSolicitationDto,
  ): Promise<ApiResponse<void>>
  createVacationSolicitation(
    solicitation: WorkLeaveSolicitationDto,
  ): Promise<ApiResponse<void>>
  createWithdrawSolicitation(
    solicitation: WorkLeaveSolicitationDto,
  ): Promise<ApiResponse<void>>
  createDayOffSolicitation(
    dayOff: string,
    workload: number,
    observation?: string,
  ): Promise<ApiResponse<void>>
  createExcusedAbsenceSolicitation(
    absenceDate: string,
  ): Promise<ApiResponse<ExcusedAbsenceSolicitationDto>>
  createJustificationType(
    justificationType: JustificationTypeDto,
  ): Promise<ApiResponse<JustificationTypeDto>>
  updateJustificationType(
    justificationType: JustificationTypeDto,
    id: string,
  ): Promise<ApiResponse<JustificationTypeDto>>
  approveExcusedAbsenceSolicitation(
    solicitationId: string,
    feedbackMessage?: string,
  ): Promise<ApiResponse<void>>
  approveTimePunchLogAdjustmentSolicitation(
    solicitationId: string,
    feedbackMessage?: string,
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
  cancelSolicitation(solicitationId: string): Promise<ApiResponse<void>>
  denySolicitation(
    solicitationId: string,
    feedbackMessage?: string,
  ): Promise<ApiResponse<void>>
  attachJustificationToSolicitation(
    solicitationId: string,
    justificationTypeId: string,
    justificationTypeName: string,
    justificationTypeShouldHaveAttachment: string,
    description: string,
    attachment?: File,
  ): Promise<ApiResponse<void>>
  deleteJustificationType(id: string): Promise<ApiResponse<void>>
}

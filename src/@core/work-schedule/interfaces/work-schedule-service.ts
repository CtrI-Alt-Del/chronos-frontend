import type { PaginationResponse } from '@/@core/global/responses/pagination-response'
import type { ApiResponse } from '@/@core/global/responses'
import type { TimePunchDto, WorkdayLogDto, WorkScheduleDto } from '../dtos'

export interface IWorkScheduleService {
  createWorkSchedule(workSchedule: WorkScheduleDto): Promise<ApiResponse<void>>
  getWorkSchedule(workScheduleId: string): Promise<ApiResponse<WorkScheduleDto>>
  listWorkSchedules(
    page: number,
  ): Promise<ApiResponse<PaginationResponse<WorkScheduleDto>>>
  listCollaboratorWorkdayLogs(
    collaboratorId: string,
    startDate: Date,
    endDate: Date,
    page: number,
  ): Promise<ApiResponse<PaginationResponse<WorkScheduleDto>>>
  reportWorkHistory(
    date: Date,
    page: number,
  ): Promise<ApiResponse<PaginationResponse<WorkdayLogDto>>>
  scheduleDaysOff(): Promise<ApiResponse<Date[]>>
  editPunch(timePunchId: string, timePunch: TimePunchDto): Promise<ApiResponse<void>>
  punchPunch(timePunchId: string, timePunch: TimePunchDto): Promise<ApiResponse<void>>
  punchPunch(timePunchId: string, timePunch: TimePunchDto): Promise<ApiResponse<void>>
  deleteWorkSchedule(workScheduleId: string): Promise<ApiResponse<void>>
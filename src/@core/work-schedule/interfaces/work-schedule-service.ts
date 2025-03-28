import type { PaginationResponse } from '@/@core/global/responses/pagination-response'
import type { ApiResponse } from '@/@core/global/responses'
import type { TimePunchDto, WorkdayLogDto, WorkScheduleDto } from '../dtos'

export interface IWorkScheduleService {
  createWorkSchedule(workSchedule: WorkScheduleDto): Promise<ApiResponse<void>>
  getWorkSchedule(workScheduleId: string): Promise<ApiResponse<WorkScheduleDto>>
  getTodayWorkdayLog(collaboratorId: string): Promise<ApiResponse<WorkdayLogDto>>
  listWorkSchedules(
    page: number,
  ): Promise<ApiResponse<PaginationResponse<WorkScheduleDto>>>
  reportCollaboratorHistory(
    collaboratorId: string,
    startDate: Date,
    endDate: Date,
    page: number,
  ): Promise<ApiResponse<PaginationResponse<WorkScheduleDto>>>
  reportWorkdayHistory(
    date: Date,
    page: number,
  ): Promise<ApiResponse<PaginationResponse<WorkdayLogDto>>>
  editTimePunchSchedule(
    timePunchScheduleId: string,
    timePunch: TimePunchDto,
  ): Promise<ApiResponse<void>>
  punchTime(timePunchLogId: string, time: Date): Promise<ApiResponse<void>>
  deleteWorkSchedule(workScheduleId: string): Promise<ApiResponse<void>>
}

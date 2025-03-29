import type { PaginationResponse } from '@/@core/global/responses/pagination-response'
import type { ApiResponse } from '@/@core/global/responses'
import type { TimePunchDto, WorkdayLogDto, WorkScheduleDto } from '../dtos'
import type { TimePunchPeriod } from '../types'

export interface IWorkScheduleService {
  createWorkSchedule(
    timePunchSchedule: Omit<TimePunchDto, 'id'>,
    daysOffSchedule: Date[],
  ): Promise<ApiResponse<void>>
  getWorkSchedule(workScheduleId: string): Promise<ApiResponse<WorkScheduleDto>>
  getTodayWorkdayLog(collaboratorId: string): Promise<ApiResponse<WorkdayLogDto>>
  listWorkSchedules(): Promise<ApiResponse<WorkScheduleDto[]>>
  reportCollaboratorHistory(
    collaboratorId: string,
    startDate: Date,
    endDate: Date,
    page: number,
  ): Promise<ApiResponse<PaginationResponse<WorkScheduleDto>>>
  reportSectorHistory(
    date: Date,
    page: number,
  ): Promise<ApiResponse<PaginationResponse<WorkdayLogDto>>>
  editDaysOffSchedule(workScheduleId: string, daysOff: Date[]): Promise<ApiResponse<void>>
  editTimePunchSchedule(timePunch: TimePunchDto): Promise<ApiResponse<void>>
  adjustTimePunchLog(
    timePunchScheduleId: string,
    timeLog: string,
    timePunchPeriod: TimePunchPeriod,
  ): Promise<ApiResponse<void>>
  punchTime(timePunchLogId: string, time: Date): Promise<ApiResponse<void>>
  deleteWorkSchedule(workScheduleId: string): Promise<ApiResponse<void>>
}

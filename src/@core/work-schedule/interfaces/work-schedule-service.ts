import type { PaginationResponse } from '@/@core/global/responses/pagination-response'
import type { ApiResponse } from '@/@core/global/responses'
import type { DayOffScheduleDto, TimePunchDto, WorkdayLogDto } from '../dtos'
import type { TimePunchPeriod } from '../types'

export interface WorkScheduleService {
  createDayOffSchedule(
    dayOffScheduleDto: DayOffScheduleDto,
    collaboratorId: string,
  ): Promise<ApiResponse<void>>
  getDayOffSchedule(collaboratorId: string): Promise<ApiResponse<DayOffScheduleDto>>
  getTodayWorkdayLog(collaboratorId: string): Promise<ApiResponse<WorkdayLogDto>>
  getCollaboratorHistory(
    collaboratorId: string,
    startDate: string,
    endDate: string,
    page: number,
  ): Promise<ApiResponse<PaginationResponse<WorkdayLogDto>>>
  getCollaborationSectorHistory(
    date: string,
    collaboratorName?: string,
    page?: number,
  ): Promise<ApiResponse<PaginationResponse<WorkdayLogDto>>>
  updateDayOffSchedule(
    collaboratorId: string,
    dayOffSchedule: DayOffScheduleDto,
  ): Promise<ApiResponse<void>>
  adjustTimePunch(
    workdayLogId: string,
    time: string,
    timePunchPeriod: TimePunchPeriod,
  ): Promise<ApiResponse<void>>
  punchTime(timePunchLogId: string, time: Date): Promise<ApiResponse<void>>
  scheduleDaysOff(
    workdaysCount: number,
    daysOffCount: number,
  ): Promise<ApiResponse<string>>
}

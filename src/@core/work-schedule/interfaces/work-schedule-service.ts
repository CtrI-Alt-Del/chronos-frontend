import type { PaginationResponse } from '@/@core/global/responses/pagination-response'
import type { ApiResponse } from '@/@core/global/responses'
import type { DayOffScheduleDto, WorkdayLogDto, WorkTimeDto } from '../dtos'
import type { TimePunchPeriod } from '../types'
import type { TimeCardDto } from '../dtos/time-card-dto'

export interface WorkScheduleService {
  createDayOffSchedule(
    dayOffScheduleDto: DayOffScheduleDto,
    collaboratorId: string,
  ): Promise<ApiResponse<void>>
  getWorkTime(collaboratorId: string): Promise<ApiResponse<WorkTimeDto>>
  getDayOffSchedule(collaboratorId: string): Promise<ApiResponse<DayOffScheduleDto>>
  getTodayWorkdayLog(collaboratorId: string): Promise<ApiResponse<WorkdayLogDto>>
  getTimeCardPdfDowloadUrl(collaboratorId: string, month: number, year: number): string
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
  getTimeCard(
    collaboratorId: string,
    month: number,
    year: number,
  ): Promise<ApiResponse<TimeCardDto>>
  updateDayOffSchedule(
    collaboratorId: string,
    dayOffSchedule: DayOffScheduleDto,
  ): Promise<ApiResponse<void>>
  adjustTimePunch(
    workdayLogId: string,
    time: string,
    timePunchPeriod: TimePunchPeriod,
  ): Promise<ApiResponse<void>>
  punchTime(workdayLogId: string, time: string): Promise<ApiResponse<void>>
  scheduleDaysOff(
    workdaysCount: number,
    daysOffCount: number,
  ): Promise<ApiResponse<string>>
}

import type { PaginationResponse } from '@/@core/global/responses/pagination-response'
import type { ApiResponse } from '@/@core/global/responses'
import type { DayOffScheduleDto, WorkdayLogDto, WorkTimeDto } from '../dtos'
import type { TimePunchPeriod } from '../types'
import type { TimeCardDto } from '../dtos/time-card-dto'
import type {
  WorkdayStatusReportDto,
  YearlyAbsenceReportDto,
  DailyPunchsReportDto,
  CollaboratorsMissingTimeReportDto,
} from '../dtos'

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
    collaboratorId: string,
    workdayLogDate: string,
    time: string,
    timePunchPeriod: TimePunchPeriod,
  ): Promise<ApiResponse<void>>
  punchTime(workdayLogId: string, time: string): Promise<ApiResponse<void>>
  scheduleDaysOff(
    workdaysCount: number,
    daysOffCount: number,
  ): Promise<ApiResponse<string>>
  getWorkdayStatusReport(): Promise<ApiResponse<WorkdayStatusReportDto>>
  getYearlyAbsenceReport(
    startDate?: string,
    endDate?: string,
  ): Promise<ApiResponse<YearlyAbsenceReportDto>>
  getDailyPunchsReport(
    date?: string,
  ): Promise<ApiResponse<DailyPunchsReportDto>>
  getCollaboratorsMissingTimeReport(
    startDate?: string,
    endDate?: string,
  ): Promise<ApiResponse<CollaboratorsMissingTimeReportDto>>
}

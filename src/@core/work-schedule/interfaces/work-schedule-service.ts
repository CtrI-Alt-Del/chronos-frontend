import type { PaginationResponse } from '@/@core/global/responses/pagination-response'
import type { ApiResponse } from '@/@core/global/responses'
import type {
  CollaboratorScheduleDto,
  DayOffScheduleDto,
  TimePunchDto,
  WeekdayScheduleDto,
  WorkdayLogDto,
} from '../dtos'
import type { TimePunchPeriod } from '../types'

export interface IWorkScheduleService {
  createDayOffSchedule(
    dayOffScheduleDto: DayOffScheduleDto,
    collaboratorId: string,
  ): Promise<ApiResponse<void>>
  getWeekSchedule(collaboratorId: string): Promise<ApiResponse<WeekdayScheduleDto[]>>
  getDayOffSchedule(collaboratorId: string): Promise<ApiResponse<DayOffScheduleDto>>
  getTodayWorkdayLog(collaboratorId: string): Promise<ApiResponse<WorkdayLogDto>>
  getCollaboratorHistory(
    collaboratorId: string,
    startDate: string,
    endDate: string,
    page: number,
  ): Promise<ApiResponse<PaginationResponse<WorkdayLogDto>>>
  getSectorHistory(
    date: string,
    page: number,
    collaboratorId?: string,
  ): Promise<ApiResponse<PaginationResponse<WorkdayLogDto>>>
  updateDayOffSchedule(
    collaboratorId: string,
    dayOffSchedule: DayOffScheduleDto,
  ): Promise<ApiResponse<void>>
  updateWeekSchedule(
    collaboratorId: string,
    weekSchedule: WeekdayScheduleDto[],
  ): Promise<ApiResponse<void>>
  updateTimePunchSchedule(timePunch: TimePunchDto): Promise<ApiResponse<void>>
  adjustTimePunchLog(
    timePunchScheduleId: string,
    timeLog: string,
    timePunchPeriod: TimePunchPeriod,
  ): Promise<ApiResponse<void>>
  punchTime(timePunchLogId: string, time: Date): Promise<ApiResponse<void>>
  scheduleDaysOff(
    workdaysCount: number,
    daysOffCount: number,
  ): Promise<ApiResponse<string>>
}

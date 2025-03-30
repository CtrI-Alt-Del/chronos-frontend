import type { PaginationResponse } from '@/@core/global/responses/pagination-response'
import type { ApiResponse } from '@/@core/global/responses'
import type {
  TimePunchDto,
  WeekdayScheduleDto,
  WorkdayLogDto,
  WorkScheduleDto,
} from '../dtos'
import type { TimePunchPeriod } from '../types'

export interface IWorkScheduleService {
  createWorkSchedule(workSchedule: WorkScheduleDto): Promise<ApiResponse<void>>
  getWorkSchedule(workScheduleId: string): Promise<ApiResponse<WorkScheduleDto>>
  getTodayWorkdayLog(collaboratorId: string): Promise<ApiResponse<WorkdayLogDto>>
  listWorkSchedules(): Promise<ApiResponse<WorkScheduleDto[]>>
  reportCollaboratorHistory(
    collaboratorId: string,
    startDate: string,
    endDate: string,
    page: number,
  ): Promise<ApiResponse<PaginationResponse<WorkdayLogDto>>>
  reportSectorHistory(
    date: string,
    page: number,
    collaboratorId?: string,
  ): Promise<ApiResponse<PaginationResponse<WorkdayLogDto>>>
  editWorkScheduleDescription(
    workScheduleId: string,
    description: string,
  ): Promise<ApiResponse<void>>
  editDaysOffSchedule(
    workScheduleId: string,
    workdaysCount: number,
    daysOffCount: number,
    daysOff: string[],
  ): Promise<ApiResponse<void>>
  editWeekSchedule(
    workScheduleId: string,
    weekSchedule: WeekdayScheduleDto[],
  ): Promise<ApiResponse<void>>
  editTimePunchSchedule(timePunch: TimePunchDto): Promise<ApiResponse<void>>
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
  deleteWorkSchedule(workScheduleId: string): Promise<ApiResponse<void>>
}

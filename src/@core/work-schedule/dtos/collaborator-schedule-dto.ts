import type { DayOffScheduleDto } from './day-off-schedule-dto'
import type { WeekdayScheduleDto } from './weekday-schedule-dto'

export type CollaboratorScheduleDto = {
  collaboratorId: string
  weekSchedule: WeekdayScheduleDto[]
  dayOffSchedule: DayOffScheduleDto
}

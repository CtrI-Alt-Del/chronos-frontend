import type { WeekdayScheduleDto } from './weekday-schedule-dto'

export type WorkScheduleDto = {
  id: string
  description: string
  workdaysCount: number
  daysOffCount: number
  weekSchedule: WeekdayScheduleDto[]
  daysOff: Date[]
}

import type { WeekdayScheduleDto } from './weekday-schedule-dto'

export type WorkScheduleDto = {
  responsible: any
  status: any
  timePunchLog: any
  timePunchSchedule: any
  date: any
  id?: string
  description: string
  workdaysCount: number
  daysOffCount: number
  weekSchedule: WeekdayScheduleDto[]
  daysOff: string[]
}

import type { TimePunchDto } from './time-punch-dto'

export type WeekdayScheduleDto = {
  id: string
  weekday: string
  timePunch: TimePunchDto
}

import type { TimePunchDto } from './time-punch-dto'

export type WeekdayScheduleDto = {
  weekday:
    | 'sunday'
    | 'monday'
    | 'tuesday'
    | 'wednesday'
    | 'thursday'
    | 'friday'
    | 'saturday'
  timePunch: TimePunchDto
}

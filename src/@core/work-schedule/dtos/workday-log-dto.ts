import type { ResponsibleDto } from '../../global/dtos/ResponsibleDto'
import type { TimePunchDto } from './time-punch-dto'

export type WorkdayLogDto = {
  id: string
  date: Date
  timePunchSchedule: TimePunchDto
  timePunchLog: TimePunchDto
  status: string
  responsible: {
    id: string
    dto?: ResponsibleDto
  }
}

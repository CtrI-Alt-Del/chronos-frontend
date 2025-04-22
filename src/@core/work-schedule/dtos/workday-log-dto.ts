import type { ResponsibleDto } from '../../global/dtos/ResponsibleDto'
import type { TimePunchDto } from './time-punch-dto'

export type WorkdayLogDto = {
  id?: string
  collaborator: any
  date: Date
  timePunch: TimePunchDto
  status: string
  responsible: {
    id: string
    dto?: ResponsibleDto
  }
}

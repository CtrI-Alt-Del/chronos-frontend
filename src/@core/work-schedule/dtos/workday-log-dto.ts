import type { ResponsibleDto } from '../../global/dtos/ResponsibleDto'
import type { TimePunchDto } from './time-punch-dto'

export type WorkdayLogDto = {
  collaborator: any
  id?: string
  date: Date
  timePunch: TimePunchDto
  status: string
  responsible: {
    id: string
    dto?: ResponsibleDto
  }
}

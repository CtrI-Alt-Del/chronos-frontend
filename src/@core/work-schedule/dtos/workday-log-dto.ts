import type { TimePunchDto } from './time-punch-dto'
import type { AggregateDto } from '@/@core/global/dtos/AggregateDto'
import type { ResponsibleDto } from '@/@core/global/dtos/ResponsibleDto'

export type WorkdayLogDto = {
  collaborator: any
  id?: string
  date: Date
  timePunch: TimePunchDto
  status: string
  responsible: AggregateDto<ResponsibleDto>
}

import type { JustificationDto } from './justification-dto'
import type { AggregateDto } from '@/@core/global/dtos/AggregateDto'
import type { ResponsibleDto } from '@/@core/global/dtos/ResponsibleDto'

export type SolicitationDto = {
  id?: string
  type: string
  description?: string
  date?: Date
  status: string
  feedbackMessage?: string
  justification?: JustificationDto
  senderResponsible?: AggregateDto<ResponsibleDto>
  replierResponsible?: AggregateDto<ResponsibleDto>
}

import type { ResponsibleAggregateDto } from '@/@core/global/dtos/ResponsibleAggregateDto'
import type { JustificationDto } from './justification-dto'

export type SolicitationDto = {
  id?: string
  description?: string
  date?: Date
  status: string
  feedbackMessage?: string
  justification?: JustificationDto
  senderResponsible?: ResponsibleAggregateDto
  replierResponsible?: ResponsibleAggregateDto
  type?: 'DAY_OFF_SCHEDULE' | 'TIME_PUNCH' | 'DAY_OFF'
}

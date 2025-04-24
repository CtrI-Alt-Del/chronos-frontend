import type { ResponsibleAggregateDto } from '@/@core/global/dtos/ResponsibleAggregateDto'

export type SolicitationDto = {
  id?: string
  description?: string
  date?: Date
  status?: string
  feedbackMessage?: string
  senderResponsible?: ResponsibleAggregateDto
  replierResponsible?: ResponsibleAggregateDto
  type?: 'DAY_OFF_SCHEDULE' | 'TIME_PUNCH' | "DAY_OFF"
}

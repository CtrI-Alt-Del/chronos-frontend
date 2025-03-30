import type { ResponsibleAggregateDto } from "@/@core/global/dtos/ResponsibleAggregateDto"

export type TimepunchLogAdjustmentDto = {
  id?: string
  description: string
  date?: Date
  status?: string
  feedbackMessage: string
  senderResponsible?: ResponsibleAggregateDto
  replierResponsible?: ResponsibleAggregateDto
  workdayLogId: string
  period: string
  time: string
}

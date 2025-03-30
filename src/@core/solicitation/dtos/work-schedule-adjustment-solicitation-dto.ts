import type { ResponsibleAggregateDto } from "@/@core/global/dtos/ResponsibleAggregateDto"

export type WorkScheduleAdjustmentSolicitationDto = {
  id?: string
  description: string
  date?: Date
  status?: string
  feedbackMessage: string
  senderResponsible?: ResponsibleAggregateDto
  replierResponsible?: ResponsibleAggregateDto
  workScheduleId: string
}

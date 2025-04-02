import type { ResponsibleAggregateDto } from '@/@core/global/dtos/ResponsibleAggregateDto'
import { SolicitationDto } from './solicitation-dto'

export type TimePunchLogAdjustmentSolicitationDto = SolicitationDto & {
  time: string
  period: string
  workdayLogDate: Date
  reason: string
}


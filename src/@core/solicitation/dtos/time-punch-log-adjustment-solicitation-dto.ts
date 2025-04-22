import type { SolicitationDto } from './solicitation-dto'

export type TimePunchLogAdjustmentSolicitationDto = SolicitationDto & {
  time: string
  period: string
  workdayLogDate: Date
  reason: string
}

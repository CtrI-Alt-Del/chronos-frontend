import type { JustificationDto } from './justification-dto'
import type { SolicitationDto } from './solicitation-dto'

export type DayOffSolicitationDto = SolicitationDto & {
  dayOff: string
  justification: JustificationDto
}

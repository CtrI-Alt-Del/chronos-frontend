import type { SolicitationDto } from './solicitation-dto'

export type VacationSolicitationDto = SolicitationDto & {
  startedAt: string
  endedAt: string
  isVacation: boolean
}

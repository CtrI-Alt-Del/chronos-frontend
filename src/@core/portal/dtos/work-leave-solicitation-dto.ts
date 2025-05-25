import type { SolicitationDto } from './solicitation-dto'

export type WorkLeaveSolicitationDto = SolicitationDto & {
  startedAt: string
  endedAt: string
  isVacation: boolean
}

import type { SolicitationDto } from './solicitation-dto'

export type WithdrawSolicitationDto = SolicitationDto & {
  startedAt: string
  endedAt: string
  isVacation: boolean
}

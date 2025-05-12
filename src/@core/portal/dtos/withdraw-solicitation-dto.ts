import type { SolicitationDto } from './solicitation-dto'

export type WithdrawSolicitationDto = SolicitationDto & {
  withdrawalDays: string[]
}

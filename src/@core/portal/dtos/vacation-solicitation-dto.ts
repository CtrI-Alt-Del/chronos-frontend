import type { SolicitationDto } from './solicitation-dto'

export type VacationSolicitationDto = SolicitationDto & {
  vacationDays: string[]
}

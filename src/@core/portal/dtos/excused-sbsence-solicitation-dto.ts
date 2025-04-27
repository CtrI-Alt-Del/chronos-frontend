import type { SolicitationDto } from './solicitation-dto'

export type ExcusedAbsenceSolicitationDto = SolicitationDto & {
  absenceDate: string
}

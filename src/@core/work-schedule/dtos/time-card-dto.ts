import type { TimePunchDto } from './time-punch-dto'

export type TimeCardDto = Array<{
  date: string
  overtime: string
  undertime: string
  latetime: string
  workedTime: string
  hourBankCredit: string
  hourBankDebit: string
  workStatus: string
  timePunch: TimePunchDto
}>

import type { TimePunchDto } from './time-punch-dto'

export type TimeCardDto = Array<{
  date: string
  workload: number
  overtime: string
  undertime: string
  latetime: string
  workedTime: string
  hourBankCredit: string
  hourBankDebit: string
  workdayStatus: string
  timePunch: TimePunchDto
}>

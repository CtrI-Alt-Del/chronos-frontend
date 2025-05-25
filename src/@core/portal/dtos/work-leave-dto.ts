import type { JustificationDto } from './justification-dto'

export type WorkLeaveDto = {
  startedAt: string
  endedAt: string
  description: string
  isVacation: boolean
  justification?: JustificationDto
}

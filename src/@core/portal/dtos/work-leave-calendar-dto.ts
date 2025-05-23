import type { ResponsibleDto } from '@/@core/global/dtos/ResponsibleDto'
import type { JustificationDto } from './justification-dto'

export type WorkLeaveCalendarDto = Array<{
  dates: string[]
  description: string
  isVacation: boolean
  justification: JustificationDto
  collaborator: ResponsibleDto
}>

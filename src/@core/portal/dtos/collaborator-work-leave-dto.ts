import type { ResponsibleDto } from '@/@core/global/dtos/ResponsibleDto'
import type { WorkLeaveDto } from './work-leave-dto'

export type CollaboratorWorkLeaveDto = {
  workLeaves: WorkLeaveDto[]
  collaborator: ResponsibleDto
}

import type { AttachmentDto } from './attachment-dto'
import type { JustificationTypeDto } from './justification-type'

export type JustificationDto = {
  description: string
  justificationType: JustificationTypeDto
  attachment?: AttachmentDto
}

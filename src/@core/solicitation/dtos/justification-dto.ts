import { AttachmentDto } from "./attachment-dto"
import { JustificationTypeDto } from "./justification-type"

export type JustificationDto = {
  description: string 
  justificationType: JustificationTypeDto
  attachment?: AttachmentDto
}

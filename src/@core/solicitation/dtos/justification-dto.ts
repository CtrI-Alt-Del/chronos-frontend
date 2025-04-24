import { AttachmentDto } from "./attachment-dto"

export type JustificationDto = {
  description: string 
  justificationType: JustificationDto
  attachment?: AttachmentDto
}

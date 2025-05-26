import { useState } from 'react'
import type { JustificationTypeDto } from '@/@core/portal/dtos'

type useJustificationDialogProps = {
  onJustificationTypeChange: (type: JustificationTypeDto) => void
  onFileInputChange: (file: File) => void
}

export function useJustificationDialog({
  onFileInputChange,
  onJustificationTypeChange,
}: useJustificationDialogProps) {
  const [needsAttachment, setNeedsAttachment] = useState<boolean>(false)

  function handleJustificationTypeChange(justificationType: JustificationTypeDto) {
    setNeedsAttachment(justificationType.shouldHaveAttachment)
    onJustificationTypeChange(justificationType)
  }

  function handleFileChange(file: File) {
    onFileInputChange(file)
  }

  return {
    needsAttachment,
    handleFileChange,
    handleJustificationTypeChange,
  }
}

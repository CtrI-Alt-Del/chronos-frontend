import type { JustificationTypeDto } from '@/@core/portal/dtos'
import { useRef, useState } from 'react'

type useJustificationDialogProps = {
  onJustificationTypeChange: (type: JustificationTypeDto) => void
  onFileInputChange: (file: File ) => void
}
export function useJustificationDialog({
  onFileInputChange,
  onJustificationTypeChange,
}: useJustificationDialogProps) {
  const [selectedJustificationType, setSelectedJustificaionType] =
    useState<null | JustificationTypeDto>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [selectedFile, setSelectedFile] = useState<string | null>(null)
  const [needsAttachment, setNeedsAttachment] = useState<boolean>(false)
  function handleJustificationTypeChange(justificationType: JustificationTypeDto) {
    setSelectedJustificaionType(justificationType)
    setNeedsAttachment(justificationType.shouldHaveAttachment)
    onJustificationTypeChange(justificationType)
  }

  const handleFileChange = (fileTarget: File) => {
    const file = fileTarget
    setSelectedFile(file)
    onFileInputChange(file)
  }
  return {
    today: new Date(),
    needsAttachment,
    fileInputRef,
    handleFileChange,
    handleJustificationTypeChange,
    selectedFile,
  }
}

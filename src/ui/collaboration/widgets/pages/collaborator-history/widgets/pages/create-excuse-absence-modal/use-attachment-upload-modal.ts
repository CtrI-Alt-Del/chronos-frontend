import { useState } from 'react'
import { useCreateExcuseAbsenceSolicitationAction } from './use-create-excuse-absence-action'
import { useAttachJusficationToSolicitationAction } from './use-attach-justification-to-solicitation-action'
import type { JustificationTypeDto } from '@/@core/portal/dtos'
import { attachJustificationToSolicitation } from '@/server/next-safe-action/portal-actions'

export function useCreateExcuseAbsenceSolicitationModal(workdayLogDate: string) {
  const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined)
  const [selectedJustificaionType, setSelectedJustificationType] =
    useState<JustificationTypeDto | null>(null)
  const [description, setDescription] = useState<string>('')
  const { createExcusedAbsenceSolicitation, isCreatingSolicitation } =
    useCreateExcuseAbsenceSolicitationAction()
  const { attachSolicitationToSolicitation, isAttaching } =
    useAttachJusficationToSolicitationAction()

  const handleFileChange = (file: File | null) => {
    setSelectedFile(file as File)
  }
  const handleDescriptionChange = (description: string) => {
    setDescription(description)
  }
  const handleJustificationTypeChange = (justificationType: JustificationTypeDto) => {
    setSelectedJustificationType(justificationType)
  }

  const handleSubmit = async () => {
    const [day, month, year] = workdayLogDate.split('/')
    const absenceDate = `${year}-${month}-${day}`
    const solicitation = await createExcusedAbsenceSolicitation(absenceDate)
    if (!selectedJustificaionType) return
    await attachSolicitationToSolicitation(
      solicitation.id as string,
      selectedJustificaionType.id as string,
      selectedJustificaionType.name,
      String(selectedJustificaionType.shouldHaveAttachment),
      description,
      selectedFile,
    )
  }

  return {
    selectedFile,
    isLoading: isCreatingSolicitation || isAttaching,
    handleFileChange,
    handleDescriptionChange,
    handleJustificationTypeChange,
    handleSubmit,
  }
}

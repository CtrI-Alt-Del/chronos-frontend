import { useState } from 'react'
import { useCreateExcuseAbsenceSolicitationAction } from './use-create-excuse-absence-action'
import { useAttachJusficationToSolicitationAction } from './use-attach-justification-to-solicitation-action'
import type { JustificationTypeDto } from '@/@core/portal/dtos'
import { useToast } from '@/ui/global/hooks/use-toast'

export function useCreateExcuseAbsenceSolicitationModal(workdayLogDate: string) {
  const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined)
  const [selectedJustificationType, setSelectedJustificationType] = 
    useState<JustificationTypeDto | null>(null)
  const [description, setDescription] = useState<string>('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const { showError } = useToast()

  const { createExcusedAbsenceSolicitation, isCreatingSolicitation } =
    useCreateExcuseAbsenceSolicitationAction()
  const { attachSolicitationToSolicitation, isAttaching } =
    useAttachJusficationToSolicitationAction()

  const handleFileChange = (file: File | null) => {
    setSelectedFile(file || undefined)
    setErrors(prev => ({ ...prev, file: '' }))
  }

  const handleDescriptionChange = (description: string) => {
    setDescription(description)
    setErrors(prev => ({ ...prev, description: '' }))
  }

  const handleJustificationTypeChange = (justificationType: JustificationTypeDto) => {
    setSelectedJustificationType(justificationType)
    setErrors(prev => ({ ...prev, justificationType: '' }))
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}
    
    if (!selectedJustificationType) {
      newErrors.justificationType = 'Selecione um tipo de justificativa'
    }
    
    if (!description.trim()) {
      newErrors.description = 'Digite uma descrição'
    } else if (description.length < 5) {
      newErrors.description = 'A descrição deve ter pelo menos 5 caracteres'
    }
    
    if (selectedJustificationType?.shouldHaveAttachment && !selectedFile) {
      newErrors.file = 'É necessário anexar um comprovante para este tipo de justificativa'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    if (!validateForm()) {
      const firstError = Object.values(errors)[0]
      if (firstError) showError(firstError)
      return
    }

    try {
      const [day, month, year] = workdayLogDate.split('/')
      const absenceDate = `${year}-${month}-${day}`
      
      const solicitation = await createExcusedAbsenceSolicitation(absenceDate)
      
      if (!selectedJustificationType) {
        showError('Tipo de justificativa não selecionado')
        return
      }
      
      await attachSolicitationToSolicitation(
        solicitation.id as string,
        selectedJustificationType.id as string,
        selectedJustificationType.name,
        String(selectedJustificationType.shouldHaveAttachment),
        description,
        selectedFile,
      )
    } catch (error) {
      showError('Ocorreu um erro ao enviar a solicitação. Tente novamente.')
      console.error('Erro ao enviar solicitação:', error)
    }
  }

  return {
    selectedFile,
    selectedJustificationType,
    description,
    isLoading: isCreatingSolicitation || isAttaching,
    errors,
    handleFileChange,
    handleDescriptionChange,
    handleJustificationTypeChange,
    handleSubmit,
  }
}
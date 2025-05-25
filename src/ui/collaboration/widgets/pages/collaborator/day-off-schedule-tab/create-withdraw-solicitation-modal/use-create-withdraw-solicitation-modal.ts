import { useState } from 'react'
import { useCreateWithDrawSolicitationAction } from './use-create-withdraw-solicitation-action'
import type { JustificationTypeDto } from '@/@core/portal/dtos'
import { useToast } from '@/ui/global/hooks/use-toast'
import type { DateValue, RangeValue } from '@heroui/react'
import { useAttachJusficationToSolicitationAction } from '../../../collaborator-history/widgets/pages/create-excuse-absence-modal/use-attach-justification-to-solicitation-action'
export function useCreateWithdrawSolicitationModal() {
  const [selectedDates, setSelectedDates] = useState<RangeValue<DateValue> | null>()
  const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined)
  const [selectedJustificationType, setSelectedJustificationType] =
    useState<JustificationTypeDto | null>(null)
  const [description, setDescription] = useState<string>('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const { showError } = useToast()

  const { createWithdrawSolicitation, isCreatingSolicitation } =
    useCreateWithDrawSolicitationAction()
  const { attachSolicitationToSolicitation, isAttaching } =
    useAttachJusficationToSolicitationAction()

  const handleFileChange = (file: File | null) => {
    setSelectedFile(file || undefined)
    setErrors((prev) => ({ ...prev, file: '' }))
  }
  const handleDatesChange = (value: RangeValue<DateValue> | null) => {
    setSelectedDates(value)
    setErrors((prev) => ({ ...prev, dates: '' }))
  }

  const handleDescriptionChange = (description: string) => {
    setDescription(description)
    setErrors((prev) => ({ ...prev, description: '' }))
  }

  const handleJustificationTypeChange = (justificationType: JustificationTypeDto) => {
    setSelectedJustificationType(justificationType)
    setErrors((prev) => ({ ...prev, justificationType: '' }))
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
      newErrors.file =
        'É necessário anexar um comprovante para este tipo de justificativa'
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
      const startDate = selectedDates?.start.toString()
      const endDate = selectedDates?.end.toString()

      if (!startDate || !endDate) {
        showError('Selecione um intervalo de datas válido')
        return
      }

      const solicitation = await createWithdrawSolicitation(startDate, endDate)
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
    } catch (error) {}
  }

  return {
    selectedFile,
    selectedJustificationType,
    description,
    isLoading: isCreatingSolicitation || isAttaching,
    errors,
    handleFileChange,
    handleDescriptionChange,
    handleDatesChange,
    handleJustificationTypeChange,
    handleSubmit,
  }
}

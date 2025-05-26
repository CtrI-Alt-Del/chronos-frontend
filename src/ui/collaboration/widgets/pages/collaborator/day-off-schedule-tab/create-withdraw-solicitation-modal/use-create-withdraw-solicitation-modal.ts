import { useState } from 'react'
import type { DateValue, RangeValue } from '@heroui/react'

import type { JustificationTypeDto } from '@/@core/portal/dtos'
import { useToast } from '@/ui/global/hooks/use-toast'
import { useCreateWithDrawSolicitationAction } from './use-create-withdraw-solicitation-action'
import { useAttachJusficationToSolicitationAction } from '../../../collaborator-history/widgets/pages/create-excuse-absence-modal/use-attach-justification-to-solicitation-action'
import { useRest } from '@/ui/global/hooks/use-rest'
import { useNavigation } from '@/ui/global/hooks/use-navigation'
import { ROUTES } from '@/constants'

export function useCreateWithdrawSolicitationModal() {
  const { portalService } = useRest()
  const [selectedDates, setSelectedDates] = useState<RangeValue<DateValue> | null>()
  const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined)
  const [selectedJustificationType, setSelectedJustificationType] =
    useState<JustificationTypeDto | null>(null)
  const [description, setDescription] = useState<string>('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const { showSuccess, showError } = useToast()
  useCreateWithDrawSolicitationAction()
  const { attachSolicitationToSolicitation, isAttaching } =
    useAttachJusficationToSolicitationAction()
  const [isCreatingSolicitation, setIsCreatingSolicitation] = useState(false)
  const { goTo } = useNavigation()

  function handleFileChange(file: File | null) {
    setSelectedFile(file ?? undefined)
    setErrors((prev) => ({ ...prev, file: '' }))
  }

  function handleDatesChange(value: RangeValue<DateValue> | null) {
    setSelectedDates(value)
    setErrors((prev) => ({ ...prev, dates: '' }))
  }

  function handleDescriptionChange(description: string) {
    setDescription(description)
    setErrors((prev) => ({ ...prev, description: '' }))
  }

  function handleJustificationTypeChange(justificationType: JustificationTypeDto) {
    setSelectedJustificationType(justificationType)
    setErrors((prev) => ({ ...prev, justificationType: '' }))
  }

  function validateForm(): boolean {
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

  async function handleSubmit() {
    if (!validateForm()) {
      const firstError = Object.values(errors)[0]
      if (firstError) showError(firstError)
      return
    }

    const startDate = selectedDates?.start.toString()
    const endDate = selectedDates?.end.toString()

    if (!startDate || !endDate) {
      showError('Selecione um intervalo de datas válido')
      return
    }

    if (!selectedJustificationType?.id) {
      showError('Tipo de justificativa não selecionado')
      return
    }

    setIsCreatingSolicitation(true)

    const response = await portalService.createWithdrawSolicitation(
      startDate,
      endDate,
      description,
    )

    if (response.isFailure) {
      showError(response.errorMessage)
    }

    if (response.isSuccess) {
      showSuccess('Solicitação de afastamento criada com sucesso')
      await attachSolicitationToSolicitation(
        response.body.id,
        selectedJustificationType.id,
        selectedJustificationType.name,
        String(selectedJustificationType.shouldHaveAttachment),
        description,
        selectedFile,
      )
      goTo(`${ROUTES.portal.solicitations}?tab=withdraw`)
    }

    setIsCreatingSolicitation(false)
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

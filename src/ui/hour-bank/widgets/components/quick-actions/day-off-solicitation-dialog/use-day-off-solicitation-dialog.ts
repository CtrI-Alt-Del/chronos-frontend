import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { z } from 'zod'
import type { JustificationTypeDto } from '@/@core/solicitation/dtos'
import { createDayOffSolicitationSchema } from '@/validation/schemas/solicitation'
import { useCreateDayOffSolicitationAction } from './use-create-day-off-solicitation-action'

type DayOffFormData = z.infer<typeof createDayOffSolicitationSchema>

export function useDayOffSolicitationDialog() {
  const { createDayOffSolicitation, isCreatingSolicitation } =
    useCreateDayOffSolicitationAction()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<DayOffFormData>({
    resolver: zodResolver(createDayOffSolicitationSchema),
    mode: 'onSubmit',
  })

  const dayOff = watch('dayOff')
  const justificationType = watch('justificationType')
  const description = watch('description')
  const attachment = watch('file')

  function handleJustificationTypeChange(type: JustificationTypeDto) {
    setValue('justificationType', {
      id: type.id as string,
      name: type.name,
      needsAttachment: String(type.shouldHaveAttachment),
    })
  }
  function handleDescriptionChange(description: string) {
    setValue('description', description)
  }

  function handleAttachmentChange(file: File | null) {
    setValue('file', file)
  }

  function onSubmit(data: DayOffFormData) {
    createDayOffSolicitation(
      data.dayOff,
      data.justificationType,
      data.description,
      data.file ?? undefined,
    )
  }

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isSubmitting: isSubmitting || isCreatingSolicitation,
    handleJustificationTypeChange,
    handleAttachmentChange,
    handleDescriptionChange,
    watch,
  }
}

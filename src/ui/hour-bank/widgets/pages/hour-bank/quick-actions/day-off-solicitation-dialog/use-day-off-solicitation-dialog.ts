import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { z } from 'zod'
import type { JustificationTypeDto } from '@/@core/portal/dtos'
import { createDayOffSolicitationSchema } from '@/validation/schemas/solicitation'
import { useCreateDayOffSolicitationAction } from './use-create-day-off-solicitation-action'

type DayOffFormData = z.infer<typeof createDayOffSolicitationSchema>

export function useDayOffSolicitationDialog(workload:number) {
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
  function onSubmit(data: DayOffFormData) {
    createDayOffSolicitation(data.dayOff,workload)
  }

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isSubmitting: isSubmitting || isCreatingSolicitation,
  }
}

import { useState } from 'react'
import { type DateValue, form, type RangeValue } from '@heroui/react'
import { useCreateVacationSolicitationAction } from './use-create-vacation-solicitation-action'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

const createVacationSolicitationSchema = z.object({
  vacationDays: z.array(z.string()).nonempty('Selecione pelo menos um dia'),
})

type VacationFormData = z.infer<typeof createVacationSolicitationSchema>

export function useVacationSolicitationDialog() {
  const [selectedDates, setSelectedDates] = useState<RangeValue<DateValue> | null>()

  const { createVacationSolicitation, isCreatingSolicitation } =
    useCreateVacationSolicitationAction()

  const handleDatesChange = (value: RangeValue<DateValue> | null) => {
    setSelectedDates(value)
  }
  function onSubmit() {
    const startDate = selectedDates?.start.toString()
    const endDate = selectedDates?.end.toString()
    if (!startDate || !endDate) return
    createVacationSolicitation(startDate, endDate)
  }
  return {
    handleSubmit: onSubmit,
    isSubmitting: isCreatingSolicitation,
    handleDatesChange,
  }
}

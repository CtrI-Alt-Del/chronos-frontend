import { useState } from 'react'
import { DateValue, form, RangeValue } from '@heroui/react'
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
    const startDate = selectedDates?.start.toDate('America/Sao_Paulo')
    const endDate = selectedDates?.end.toDate('America/Sao_Paulo')
    if (!startDate || !endDate) {
      console.log('TENTA BUGA O SITE NAO OTARIO')
      return
    }
    const vacationDays: string[] = []
    let currentDate = new Date(startDate)
    while (currentDate <= endDate) {
      vacationDays.push(currentDate.toISOString().split('T')[0])
      currentDate.setDate(currentDate.getDate() + 1)
    }

    createVacationSolicitation(vacationDays)
  }
  return {
    handleSubmit: onSubmit,
    isSubmitting: isCreatingSolicitation,
    handleDatesChange,
  }
}

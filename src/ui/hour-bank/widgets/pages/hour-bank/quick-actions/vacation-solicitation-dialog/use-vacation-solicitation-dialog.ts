import { useState } from 'react'
import type { DateValue, RangeValue } from '@heroui/react'

export function useVacationSolicitationDialog(
  createVacationSolicitation: (startDate: string, endDate: string) => Promise<void>,
) {
  const [selectedDates, setSelectedDates] = useState<RangeValue<DateValue> | null>()

  const handleDatesChange = (value: RangeValue<DateValue> | null) => {
    setSelectedDates(value)
  }

  async function handleSubmit() {
    const startDate = selectedDates?.start.toString()
    const endDate = selectedDates?.end.toString()
    if (!startDate || !endDate) return
    await createVacationSolicitation(startDate, endDate)
  }

  return {
    handleSubmit,
    handleDatesChange,
  }
}

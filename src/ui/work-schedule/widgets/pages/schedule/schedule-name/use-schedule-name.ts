import { type ChangeEvent, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import type { WorkScheduleForm } from '../use-schedule-page'

export function useScheduleName(defaultValue?: string) {
  const { setValue } = useFormContext<WorkScheduleForm>()
  const [name, setName] = useState(defaultValue)

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    setName(event.currentTarget.value)
    setValue('description', event.currentTarget.value)
  }

  return {
    name,
    handleInputChange,
  }
}

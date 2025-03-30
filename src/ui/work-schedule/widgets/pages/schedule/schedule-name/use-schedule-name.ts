import { type ChangeEvent, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import type { WorkScheduleForm } from '../use-schedule-page'

export function useScheduleName(
  editWorkScheduleDescription: (description: string) => Promise<void>,
  defaultName?: string,
) {
  const { setValue } = useFormContext<WorkScheduleForm>()
  const [name, setName] = useState(defaultName)

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    setName(event.currentTarget.value)
    setValue('description', event.currentTarget.value)
  }

  async function handleConfirmButtonClick() {
    if (name) await editWorkScheduleDescription(name)
  }

  return {
    name,
    isInputDisabled: name === defaultName,
    handleInputChange,
    handleConfirmButtonClick,
  }
}

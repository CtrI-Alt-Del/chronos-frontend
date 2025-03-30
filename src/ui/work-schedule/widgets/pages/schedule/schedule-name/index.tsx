'use client'

import { Input } from '@heroui/input'
import { Button } from '@heroui/button'
import { useScheduleName } from './use-schedule-name'
import { useEditWorkScheduleDescriptionAction } from './use-edit-work-schedule-description-action'

type ScheduleNameProps = {
  defaultValue?: string
  workScheduleId?: string
}

export const ScheduleName = ({ defaultValue, workScheduleId }: ScheduleNameProps) => {
  const { isEditing, editWorkScheduleDescription } =
    useEditWorkScheduleDescriptionAction(workScheduleId)
  const { name, isInputDisabled, handleInputChange, handleConfirmButtonClick } =
    useScheduleName(editWorkScheduleDescription, defaultValue)

  return (
    <div className='flex items-center gap-2 max-w-lg'>
      <Input value={name} placeholder='Escala 5x2' onChange={handleInputChange} />
      <Button
        color='primary'
        isDisabled={isInputDisabled || isEditing}
        isLoading={isEditing}
        onPress={handleConfirmButtonClick}
      >
        Salvar
      </Button>
    </div>
  )
}

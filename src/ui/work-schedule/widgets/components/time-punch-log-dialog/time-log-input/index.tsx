'use client'

import { useRef } from 'react'
import { Button } from '@heroui/button'

import { Icon } from '@/ui/global/widgets/components/Icon'
import { AlertDialog } from '@/ui/global/widgets/components/alert-dialog'
import { TimeInput } from '../../time-input'
import { useTimeLogInput } from './use-time-log-input'
import { Time } from '../../time'

type TimeInputProps = {
  defaultValue: string | null
  onChange: (value: string) => void
}

export const TimeLogInput = ({ defaultValue, onChange }: TimeInputProps) => {
  const {
    isEditing,
    value,
    handleInputChange,
    handleEditButtonClick,
    handleConfirmButtonClick,
    handleCancelButtonClick,
  } = useTimeLogInput(defaultValue, onChange)

  return (
    <div className='flex items-center gap-1'>
      <TimeInput value={value} onChange={handleInputChange} isDisabled={!isEditing} />
      {isEditing ? (
        <AlertDialog
          title='Editar ponto'
          trigger={
            <Button isIconOnly variant='light' className='text-primary'>
              <Icon name='confirm' size={16} />
            </Button>
          }
          onConfirm={handleConfirmButtonClick}
          onCancel={handleCancelButtonClick}
        >
          <div className='text-md text-slate-600'>
            {defaultValue ? (
              <p>
                Tem certaza que deseja mudar esse ponto de{' '}
                <Time className='font-bold'>{defaultValue}</Time> para{' '}
                <Time className='font-bold'>{value}</Time>?
              </p>
            ) : (
              <p>Tem certeza que deseja alterar esse ponto?</p>
            )}
          </div>
        </AlertDialog>
      ) : (
        <Button isIconOnly variant='light' onPress={handleEditButtonClick}>
          <Icon name='edit' size={16} />
        </Button>
      )}
    </div>
  )
}

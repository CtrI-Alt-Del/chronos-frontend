'use client'

import { useRef } from 'react'
import { Button } from '@heroui/button'

import { Icon } from '@/ui/global/widgets/components/Icon'
import { AlertDialog } from '@/ui/global/widgets/components/alert-dialog'
import { TimeInput } from '../../time-input'
import { useTimeLogInput } from './use-time-log-input'

type TimeInputProps = {
  defaultValue: string | null
  onChange: (value: string) => void
}

export const TimeLogInput = ({ defaultValue, onChange }: TimeInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const {
    isEditing,
    value,
    handleEditButtonClick,
    handleConfirmButtonClick,
    handleCancelButtonClick,
  } = useTimeLogInput(inputRef, onChange)

  return (
    <div className='flex items-center gap-1'>
      <TimeInput ref={inputRef} defaultValue={defaultValue} isDisabled={!isEditing} />
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
                Tem certaza que deseja mudar esse ponto de <strong>{defaultValue}</strong>{' '}
                para <strong>{value}</strong>?
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

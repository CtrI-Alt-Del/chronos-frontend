'use client'

import { Time } from '@internationalized/date'
import { TimeInput as Input } from '@heroui/react'
import type { RefObject } from 'react'

import { useTimeInput } from './use-time-input'
import { Icon } from '@/ui/global/widgets/components/Icon'

type TimeInputProps = {
  ref?: RefObject<HTMLInputElement>
  defaultValue?: string | null
  isDisabled?: boolean
  hasIcon?: boolean
  onChange?: (time: string) => void
}

export const TimeInput = ({
  ref,
  defaultValue,
  isDisabled = false,
  hasIcon = false,
  onChange,
}: TimeInputProps) => {
  const { time, handleValueChange } = useTimeInput(defaultValue ?? null, onChange)

  return (
    <Input
      inputRef={ref}
      defaultValue={time ? new Time(time.hours, time.minutes) : undefined}
      isDisabled={isDisabled}
      startContent={hasIcon ? <Icon name='clock' /> : null}
      className='w-24'
      onChange={handleValueChange}
    />
  )
}

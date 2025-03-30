'use client'

import { Time } from '@internationalized/date'
import { cn, TimeInput as Input } from '@heroui/react'
import type { RefObject } from 'react'

import { useTimeInput } from './use-time-input'
import { Icon } from '@/ui/global/widgets/components/Icon'

type TimeInputProps = {
  ref?: RefObject<HTMLInputElement>
  value?: string | null
  isDisabled?: boolean
  hasIcon?: boolean
  onChange?: (time: string) => void
}

export const TimeInput = ({
  ref,
  value,
  isDisabled = false,
  hasIcon = false,
  onChange,
}: TimeInputProps) => {
  const { time, handleValueChange } = useTimeInput(value, onChange)

  return (
    <Input
      inputRef={ref}
      defaultValue={time}
      value={time}
      isDisabled={isDisabled}
      startContent={hasIcon ? <Icon name='clock' /> : null}
      className={cn(hasIcon ? 'w-24' : 'w-20')}
      onChange={handleValueChange}
    />
  )
}

'use client'

import { Time } from '@internationalized/date'
import { TimeInput as Input } from '@heroui/react'
import type { RefObject } from 'react'

import { useTimeInput } from './use-time-input'

type TimeInputProps = {
  ref?: RefObject<HTMLInputElement>
  defaultValue: string | null
  isDisabled?: boolean
}

export const TimeInput = ({ ref, defaultValue, isDisabled = false }: TimeInputProps) => {
  const { time } = useTimeInput(defaultValue)

  return (
    <Input
      inputRef={ref}
      defaultValue={time ? new Time(time.hours, time.minutes) : undefined}
      isDisabled={isDisabled}
      className='w-max'
    />
  )
}

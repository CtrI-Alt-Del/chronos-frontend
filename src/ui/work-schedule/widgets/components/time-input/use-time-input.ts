import { useDatetime } from '@/ui/global/hooks/use-datetime'
import type { Time } from '@internationalized/date'
import { useEffect, useState } from 'react'

export function useTimeInput(
  defaultValue: string | null,
  onChange?: (time: string) => void,
) {
  const { formatTime } = useDatetime()
  const parts = defaultValue ? defaultValue.split(':') : null
  const time = parts
    ? {
        hours: Number(parts[0]),
        minutes: Number(parts[1]),
      }
    : null

  function handleValueChange(value: Time | null) {
    if (!value || !onChange) return
    const date = new Date()
    date.setHours(value.hour)
    date.setMinutes(value.minute)

    const formattedTime = formatTime(date)
    onChange(formattedTime)
  }

  return {
    time,
    handleValueChange,
  }
}

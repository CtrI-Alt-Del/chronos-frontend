import { Time } from '@internationalized/date'
import { useEffect, useState } from 'react'

import { useDatetime } from '@/ui/global/hooks/use-datetime'

export function useTimeInput(value?: string | null, onChange?: (time: string) => void) {
  const { formatTime } = useDatetime()
  const [time, setTime] = useState<Time | null>(null)

  function handleValueChange(time: Time | null) {
    if (!time || !onChange) return
    const date = new Date()
    date.setHours(time.hour)
    date.setMinutes(time.minute)

    const formattedTime = formatTime(date)
    console.log({ formattedTime })
    onChange(formattedTime)
    setTime(time)
  }

  useEffect(() => {
    const parts = value ? value.split(':') : null
    const time = parts
      ? {
          hours: Number(parts[0]),
          minutes: Number(parts[1]),
        }
      : null
    if (time) setTime(new Time(time.hours, time.minutes))
  }, [value])

  return {
    time,
    handleValueChange,
  }
}

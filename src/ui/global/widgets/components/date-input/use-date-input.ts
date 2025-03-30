import { type CalendarDate, parseDate } from '@internationalized/date'

import { useDatetime } from '@/ui/global/hooks/use-datetime'

export function useDateInput(defualtDate: Date, onChange: (date: Date) => void) {
  const { inZonedTime, formatIsoDate } = useDatetime()

  function handleValueChange(value: CalendarDate | null) {
    if (value) onChange(inZonedTime(value.toString()))
  }

  return {
    date: parseDate(formatIsoDate(defualtDate)),
    handleValueChange,
  }
}

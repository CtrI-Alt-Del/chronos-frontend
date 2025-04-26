import { type CalendarDate, parseDate } from '@internationalized/date'

import { useDatetime } from '@/ui/global/hooks/use-datetime'
import type { RangeValue } from '@heroui/react'

type DateRangeInputProps = {
  defeaultStartDate: Date
  defeaultEndDate: Date
  onStartDateChange: (date: Date) => void
  onEndDateChange: (date: Date) => void
}

export function useDateRangeInput({
  defeaultEndDate,
  defeaultStartDate,
  onEndDateChange,
  onStartDateChange,
}: DateRangeInputProps) {
  const { inZonedTime, plusDays, formatIsoDate } = useDatetime()

  function handleValueChange(value: RangeValue<CalendarDate> | null) {
    if (value) {
      onStartDateChange(plusDays(new Date(value.start.toString()), 1))
      onEndDateChange(plusDays(new Date(value.end.toString()), 1))
    }
  }

  return {
    startDate: parseDate(formatIsoDate(defeaultStartDate)),
    endDate: parseDate(formatIsoDate(defeaultEndDate)),
    handleValueChange,
  }
}

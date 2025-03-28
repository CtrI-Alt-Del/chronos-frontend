import { type CalendarDate, parseDate } from '@internationalized/date'

import { useDatetime } from '@/ui/global/hooks/use-datetime'
import type { RangeValue } from '@heroui/react'

type DateRangeInputProps = {
  defualtStartDate: Date
  defualtEndDate: Date
  onStartDateChange: (date: Date) => void
  onEndDateChange: (date: Date) => void
}

export function useDateRangeInput({
  defualtEndDate,
  defualtStartDate,
  onEndDateChange,
  onStartDateChange,
}: DateRangeInputProps) {
  const { inZonedTime, formatIsoDate } = useDatetime()

  function handleValueChange(value: RangeValue<CalendarDate> | null) {
    if (value) {
      onStartDateChange(inZonedTime(value.start.toString()))
      onEndDateChange(inZonedTime(value.end.toString()))
    }
  }

  return {
    startDate: parseDate(formatIsoDate(defualtStartDate)),
    endDate: parseDate(formatIsoDate(defualtEndDate)),
    handleValueChange,
  }
}

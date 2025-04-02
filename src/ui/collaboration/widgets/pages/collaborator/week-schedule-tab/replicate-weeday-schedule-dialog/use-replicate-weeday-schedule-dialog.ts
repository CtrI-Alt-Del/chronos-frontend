import { useState } from 'react'

export function useReplicateWeekdayScheduleDialog(
  onWeekdaysReplicate: (weekdays: string[]) => void,
) {
  const [weekdays, setWeekdays] = useState<string[]>([
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
  ])

  function handleWeekdaysChange(weekdays: string[]) {
    setWeekdays(weekdays)
  }

  function handleConfirm() {
    onWeekdaysReplicate(weekdays)
  }

  return {
    weekdays,
    handleWeekdaysChange,
    handleConfirm,
  }
}

import { useDatetime } from '@/ui/global/hooks/use-datetime'
import { eachDayOfInterval, endOfMonth, getDay } from 'date-fns'
import { useState } from 'react'

type Day = {
  day: string
  isOffDay: boolean
  isFirstSaturday: boolean
  isFirstSundayOnly: boolean
}

export function useDaysOffSchedule(today: Date) {
  const {
    plusDays,
    getMonthDaysOf,
    getLastMonthDayOf,
    getCurrentMonthFirstMonday,
    formatIsoDate,
  } = useDatetime()
  const [workdaysCount, setWorkdaysCount] = useState(5)
  const [offDaysCount, setOffDaysCount] = useState(2)
  const [selectedDays, setSelectedDays] = useState(new Set())
  const [isCalendarEnabled, setIsCalendarEnabled] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleDaysOffScheduleGenerate = () => {
    if (workdaysCount + offDaysCount !== 7) {
      setError('A soma dos dias de trabalho e folga deve ser igual a 7.')
      return
    }

    setError(null)
    setIsCalendarEnabled(true)
    const newSelectedDays = new Set()

    let currentDay = getCurrentMonthFirstMonday()
    const lastMonthDay = getLastMonthDayOf(today)

    while (currentDay <= lastMonthDay) {
      for (let i = 0; i < workdaysCount && currentDay <= lastMonthDay; i++) {
        currentDay = plusDays(currentDay, 1)
      }

      for (let i = 0; i < offDaysCount && currentDay <= lastMonthDay; i++) {
        newSelectedDays.add(formatIsoDate(currentDay))
        currentDay = plusDays(currentDay, 1)
      }
    }

    let firstSaturday: unknown = null
    let firstSunday: unknown = null
    const monthDays = getMonthDaysOf()

    monthDays.forEach((day) => {
      const formattedDate = formatIsoDate(day)
      const dayOfWeek = getDay(day)

      if (dayOfWeek === 6 && !firstSaturday) {
        firstSaturday = formattedDate
        newSelectedDays.add(firstSaturday)
      }

      if (dayOfWeek === 0 && !firstSunday) {
        firstSunday = formattedDate
        newSelectedDays.add(firstSunday)
      }
    })

    setSelectedDays(newSelectedDays)
  }

  function handleDaysOffCountChange(value: number) {
    if (error) setError(null)
    setOffDaysCount(value)
  }

  function handleWorkdaysCountCountChange(value: number) {
    if (error) setError(null)
    setWorkdaysCount(value)
  }

  function handleDayToggle(date: string) {
    if (!isCalendarEnabled) return
    const newSelectedDays = new Set(selectedDays)
    if (newSelectedDays.has(date)) {
      newSelectedDays.delete(date)
    } else {
      newSelectedDays.add(date)
    }
    setSelectedDays(newSelectedDays)
  }

  return {
    error,
    workdaysCount,
    offDaysCount,
    handleDayToggle,
    handleDaysOffCountChange,
    handleWorkdaysCountCountChange,
    handleDaysOffScheduleGenerate,
  }
}

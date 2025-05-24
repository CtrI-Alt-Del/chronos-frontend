import { useRest } from '@/ui/global/hooks/use-rest'
import { useCache } from '@/ui/global/hooks/use-cache'
import { CACHE } from '@/@core/global/constants'
import { useState } from 'react'

export function useDailyTimePunchChart() {
  const { workScheduleService } = useRest()
  const [startDate, setStartDate] = useState<Date>(new Date())
  const [endDate, setEndDate] = useState<Date>(new Date())

  function formatHour(index: number): string {
    const hour = index % 24
    const suffix = hour >= 12 ? 'PM' : 'AM'
    const formatted = hour % 12 === 0 ? 12 : hour % 12
    return `${String(formatted).padStart(2, '0')} ${suffix}`
  }

  const fetchDailyPunchs = async () => {
    const response = await workScheduleService.getDailyPunchsReport()
    if (response.isFailure) response.throwError()
    return response.body
  }

  const { data, isFetching } = useCache({
    fetcher: fetchDailyPunchs,
    key: CACHE.workSchedule.dailyTimePunch.key,
    dependencies: [startDate, endDate],
  })

  function handleStartDateInputChange(date: Date) {
    setStartDate(date)
  }

  function handleEndDateInputChange(date: Date) {
    setEndDate(date)
  }

  const dailyPunchs = data?.clockEvents.map((event, index) => ({
    hour: formatHour(index),
    Entradas: event.clockIns,
    Saídas: event.clockOuts,
  }))

  return {
    dailyPunchs,
    isFetching,
    startDate,
    endDate,
    handleStartDateInputChange,
    handleEndDateInputChange,
  }
}

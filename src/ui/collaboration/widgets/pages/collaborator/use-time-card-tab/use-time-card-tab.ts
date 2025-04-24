'use client'

import { useState } from 'react'

import { CACHE } from '@/@core/global/constants'
import { useCache, useRest } from '@/ui/global/hooks'
import { useDatetime } from '@/ui/global/hooks/use-datetime'

export function useTimeCardTab(collaboratorId: string, date: Date) {
  const { workScheduleService } = useRest()
  const [month, setMonth] = useState(date.getMonth() + 1)
  const [year, setYear] = useState(date.getFullYear())
  const { formatDate } = useDatetime()

  async function fetchTimeCard() {
    const response = await workScheduleService.getTimeCard(collaboratorId, month, year)
    if (response.isFailure) {
      response.throwError()
    }
    return response.body
  }

  const { data, isFetching } = useCache({
    fetcher: fetchTimeCard,
    key: CACHE.workSchedule.timeCard.key(collaboratorId),
    dependencies: [collaboratorId],
  })

  function handleDateInputChange(month: number, year: number) {
    setMonth(month)
    setYear(year)
  }

  return {
    timeCard:
      data?.map((row) => ({
        ...row,
        date: formatDate(row.date),
      })) ?? [],
    isLoading: isFetching,
    month: date.getMonth() + 1,
    year: date.getFullYear(),
    handleDateInputChange,
  }
}

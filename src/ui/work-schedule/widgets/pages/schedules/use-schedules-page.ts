'use client'

import { CACHE } from '@/@core/global/constants'
import { useRest } from '@/ui/global/hooks'
import { useCache } from '@/ui/global/hooks/use-cache'
import { useEffect } from 'react'

export function useSchedulesPage() {
  const api = useRest()

  async function fetchSchedules() {
    const response = await api.workScheduleService.listWorkSchedules()
    return response.body
  }

  const { data, isFetching, isRefetching } = useCache({
    fetcher: fetchSchedules,
    key: CACHE.workSchedule.schedules.key,
    dependencies: [],
    shouldRefetchOnFocus: false,
  })

  return {
    schedules: data,
    isFetchingSchedules: isFetching || isRefetching,
  }
}

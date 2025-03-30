'use client'

import { CACHE } from '@/@core/global/constants'
import { useApi } from '@/ui/global/hooks'
import { useCache } from '@/ui/global/hooks/use-cache'
import { useEffect } from 'react'

export function useSchedulesPage() {
  const api = useApi()

  async function fetchSchedules() {
    const response = await api.workScheduleService.listWorkSchedules()
    return response.body
  }

  const { data, isFetching, refetch } = useCache({
    fetcher: fetchSchedules,
    key: CACHE.workSchedule.schedules.key,
    dependencies: [],
    shouldRefetchOnFocus: true,
  })

  useEffect(() => {
    refetch()
  }, [])

  return {
    schedules: data,
    isFetchingSchedules: isFetching,
  }
}

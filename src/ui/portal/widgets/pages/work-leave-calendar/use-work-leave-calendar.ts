import { useState } from 'react'

import { CACHE } from '@/@core/global/constants/cache'
import type { PortalService } from '@/@core/portal/interfaces'
import { useCache } from '@/ui/global/hooks/use-cache'

export function useWorkLeaveCalendar(portalService: PortalService, date: Date) {
  const [month, setMonth] = useState(date.getMonth() + 1)
  const [year, setYear] = useState(date.getFullYear())

  async function fetchWorkLeaveCalendar() {
    const response = await portalService.getWorkLeaveCalendar()
    return response.body
  }

  const { data, isFetching } = useCache({
    fetcher: fetchWorkLeaveCalendar,
    key: CACHE.portal.workLeaveCalendar.key,
  })

  function handleDateInputChange(month: number, year: number) {
    setMonth(month)
    setYear(year)
  }

  return {
    workLeaveCalendar: data ?? [],
    isLoading: isFetching,
    month: date.getMonth() + 1,
    year: date.getFullYear(),
    handleDateInputChange,
  }
}

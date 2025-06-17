import { useState } from 'react'

import { CACHE } from '@/@core/global/constants/cache'
import type { PortalService } from '@/@core/portal/interfaces'
import { usePaginatedCache } from '@/ui/global/hooks/use-paginated-cache'
import { useDatetime } from '@/ui/global/hooks/use-datetime'

export function useWorkLeaveCalendar(portalService: PortalService, date: Date) {
  const [month, setMonth] = useState(date.getMonth() + 1)
  const [lastValidMonth, setLastValidMonth] = useState(date.getMonth() + 1)
  const [year, setYear] = useState(date.getFullYear())
  const [collaboratorName, setCollaboratorName] = useState('')
  const { getMonthDaysOf } = useDatetime()

  async function fetchWorkLeaveCalendar() {
    const usedMonth = month === 0 ? lastValidMonth : month
    const response = await portalService.getWorkLeaveCalendar(
      year,
      usedMonth,
      collaboratorName,
    )
    if (response.isFailure) {
      response.throwError()
    }

    return response.body
  }

  const { data, isFetching, page, itemsCount, pagesCount, setPage, refetch } =
    usePaginatedCache({
      fetcher: fetchWorkLeaveCalendar,
      key: CACHE.portal.workLeaveCalendar.key,
      dependencies: [year, month, collaboratorName],
    })

  function handleDateInputChange(newMonth: number, year: number) {
    setMonth(newMonth)
    setYear(year)
    if (newMonth > 0 && newMonth <= 12) {
      setLastValidMonth(newMonth)
    }
  }

  function handleCollaboratorNameChange(collaboratorName: string) {
    setCollaboratorName(collaboratorName)
  }

  function handlePageChange(page: number) {
    setPage(page)
    refetch()
  }

  return {
    collaboratorWorkLeaves: data ?? [],
    isLoading: isFetching,
    month: date.getMonth() + 1,
    year: date.getFullYear(),
    page,
    itemsCount,
    pagesCount,
    monthDays: getMonthDaysOf(new Date(year, month - 1, 1)),
    handlePageChange,
    handleDateInputChange,
    handleCollaboratorNameChange,
  }
}

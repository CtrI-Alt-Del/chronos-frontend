import { useState } from 'react'

import { CACHE } from '@/@core/global/constants/cache'
import type { PortalService } from '@/@core/portal/interfaces'
import { usePaginatedCache } from '@/ui/global/hooks/use-paginated-cache'

export function useWorkLeaveCalendar(portalService: PortalService, date: Date) {
  const [month, setMonth] = useState(date.getMonth() + 1)
  const [year, setYear] = useState(date.getFullYear())
  const [collaboratorName, setCollaboratorName] = useState('')

  async function fetchWorkLeaveCalendar() {
    const response = await portalService.getWorkLeaveCalendar(
      year,
      month,
      collaboratorName,
    )
    if (response.isFailure) {
      response.throwError()
    }

    return response.body
  }

  const { data, isFetching, page, itemsCount, setPage } = usePaginatedCache({
    fetcher: fetchWorkLeaveCalendar,
    key: CACHE.portal.workLeaveCalendar.key,
    dependencies: [year, month, collaboratorName],
  })

  function handleDateInputChange(month: number, year: number) {
    setMonth(month)
    setYear(year)
  }

  function handleCollaboratorNameChange(collaboratorName: string) {
    setCollaboratorName(collaboratorName)
  }

  return {
    collaboratorWorkLeaves: data ?? [],
    isLoading: isFetching,
    month: date.getMonth() + 1,
    year: date.getFullYear(),
    page,
    itemsCount,
    handlePageChange: setPage,
    handleDateInputChange,
    handleCollaboratorNameChange,
  }
}

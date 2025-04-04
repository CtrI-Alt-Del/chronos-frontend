import { useState } from 'react'

import type { TimePunchPeriod } from '@/@core/work-schedule/types'
import { CACHE } from '@/@core/global/constants'
import { PaginationResponse } from '@/@core/global/responses'
import { useDatetime } from '@/ui/global/hooks/use-datetime'
import { useQueryParamString } from '@/ui/global/hooks/use-query-param-string'
import { useQueryParamDate } from '@/ui/global/hooks/use-query-param-date'
import { usePaginatedCache } from '@/ui/global/hooks/use-paginated-cache'
import { useApi } from '@/ui/global/hooks/use-api'
import { useToast } from '@/ui/global/hooks/use-toast'

export function useSectorHistoryPage() {
  const { getCurrentDate, formatIsoDate } = useDatetime()
  const [date, setDate] = useQueryParamDate('date', getCurrentDate())
  const [collboratorName, setCollboratorName] = useQueryParamString('name')
  const { workScheduleService } = useApi()
  const { showError, showSuccess } = useToast()
  const [isAdjustingTimePunchLog, setIsAdjustingTimePunchLog] = useState(false)

  async function fetchSectorHistory(page: number) {
    const response = await workScheduleService.reportSectorHistory(
      formatIsoDate(date),
      page,
    )
    return response.body
  }

  const { data, page, pagesCount, isFetching, isRefetching, refetch, setPage } =
    usePaginatedCache({
      key: CACHE.workSchedule.sectorHistory.key,
      fetcher: fetchSectorHistory,
      dependencies: [date, collboratorName],
      shouldRefetchOnFocus: false,
    })

  function handleCollaboratorNameChange(name: string) {
    setCollboratorName(name)
  }

  function handleDateChange(date: Date) {
    setDate(date)
  }

  function handlePageChange(page: number) {
    setPage(page)
  }

  async function handleTimeLogChange(
    timePunchLogId: string,
    timeLog: string,
    timePunchPeriod: TimePunchPeriod,
  ) {
    setIsAdjustingTimePunchLog(true)

    const response = await workScheduleService.adjustTimePunchLog(
      timePunchLogId,
      timeLog,
      timePunchPeriod,
    )
    if (response.isFailure) {
      showError(response.errorMessage)
    }

    if (response.isSuccess) {
      refetch()
      showSuccess('Ponto ajustado')
    }

    setIsAdjustingTimePunchLog(false)
  }

  return {
    workdayLogs: data,
    collboratorName,
    date,
    isLoading: isAdjustingTimePunchLog || isFetching || isRefetching,
    page,
    pagesCount,
    handleCollaboratorNameChange,
    handleDateChange,
    handlePageChange,
    handleTimeLogChange,
  }
}

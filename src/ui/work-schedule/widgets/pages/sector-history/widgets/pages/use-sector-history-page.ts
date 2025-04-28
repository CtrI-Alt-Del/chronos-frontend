import { useState } from 'react'

import type { TimePunchPeriod } from '@/@core/work-schedule/types'
import { CACHE } from '@/@core/global/constants'
import { useDatetime } from '@/ui/global/hooks/use-datetime'
import { useQueryParamString } from '@/ui/global/hooks/use-query-param-string'
import { useQueryParamDate } from '@/ui/global/hooks/use-query-param-date'
import { usePaginatedCache } from '@/ui/global/hooks/use-paginated-cache'
import { useRest } from '@/ui/global/hooks/use-rest'
import { useToast } from '@/ui/global/hooks/use-toast'

export function useSectorHistoryPage() {
  const { getCurrentDate, formatIsoDate } = useDatetime()
  const [date, setDate] = useQueryParamDate('date', getCurrentDate())
  const [collboratorName, setCollboratorName] = useQueryParamString('collaboratorName')
  const { workScheduleService } = useRest()
  const { showError, showSuccess } = useToast()
  const [isAdjustingTimePunchLog, setIsAdjustingTimePunchLog] = useState(false)

  async function fetchSectorHistory(page: number) {
    const response = await workScheduleService.getCollaborationSectorHistory(
      formatIsoDate(date),
      collboratorName,
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

    const response = await workScheduleService.adjustTimePunch(
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

  console.log(data)
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

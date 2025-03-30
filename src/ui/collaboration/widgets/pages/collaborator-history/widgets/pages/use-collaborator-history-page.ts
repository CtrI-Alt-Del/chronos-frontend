import { useState } from 'react'

import { useAuthContext } from '@/ui/auth/hooks/use-auth-context'
import type { TimePunchPeriod } from '@/@core/work-schedule/types'
import { CACHE } from '@/@core/global/constants'
import { useDatetime } from '@/ui/global/hooks/use-datetime'
import { useQueryParamString } from '@/ui/global/hooks/use-query-param-string'
import { useQueryParamDate } from '@/ui/global/hooks/use-query-param-date'
import { usePaginatedCache } from '@/ui/global/hooks/use-paginated-cache'
import { useApi } from '@/ui/global/hooks/use-api'
import { useToast } from '@/ui/global/hooks/use-toast'

export function useCollaboratorHistoryPage() {
  const { getCurrentDate, minusDays, formatIsoDate } = useDatetime()
  const [startDate, setStartDate] = useQueryParamDate(
    'startDate',
    minusDays(getCurrentDate(), 7),
  )
  const [endDate, setEndDate] = useQueryParamDate('endDate', getCurrentDate())
  const [collboratorName, setCollboratorName] = useQueryParamString('name')
  const [isAdjustingTimePunchLog, setIsAdjustingTimePunchLog] = useState(false)
  const { account } = useAuthContext()
  const { workScheduleService } = useApi()
  const { showError, showSuccess } = useToast()
  console.log(startDate)
  console.log(endDate)

  async function fetchCollaboratorHistory(page: number) {
    const response = await workScheduleService.reportCollaboratorHistory(
      String(account?.collaboratorId),
      formatIsoDate(startDate),
      formatIsoDate(endDate),
      page,
    )
    return response.body
  }

  const { data, page, pagesCount, isFetching, refetch, setPage } = usePaginatedCache({
    key: CACHE.workSchedule.collaboratorHistory.key,
    fetcher: fetchCollaboratorHistory,
    dependencies: [startDate, endDate],
    shouldRefetchOnFocus: false,
    isEnabled: Boolean(account),
  })

  function handleStartDateChange(date: Date) {
    setStartDate(date)
  }

  function handleEndDateChange(date: Date) {
    setEndDate(date)
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
      showSuccess('Ponto ajustado com sucesso')
    }

    setIsAdjustingTimePunchLog(false)
  }

  return {
    workdayLogs: data ?? [],
    startDate,
    endDate,
    isLoading: isAdjustingTimePunchLog || isFetching,
    page,
    pagesCount,
    handleStartDateChange,
    handleEndDateChange,
    handlePageChange,
    handleTimeLogChange,
  }
}

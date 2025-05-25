import { useState } from 'react'

import type { TimePunchPeriod } from '@/@core/work-schedule/types'
import { CACHE } from '@/@core/global/constants'
import { useDatetime } from '@/ui/global/hooks/use-datetime'
import { useQueryParamDate } from '@/ui/global/hooks/use-query-param-date'
import { usePaginatedCache } from '@/ui/global/hooks/use-paginated-cache'
import { useToast } from '@/ui/global/hooks/use-toast'
import type { WorkScheduleService } from '@/@core/work-schedule/interfaces'

export function useCollaboratorHistoryPage(
  workScheduleService: WorkScheduleService,
  collaboratorId?: string,
) {
  const { getCurrentDate, minusDays, formatIsoDate } = useDatetime()
  const [startDate, setStartDate] = useQueryParamDate(
    'startDate',
    minusDays(getCurrentDate(), 7),
  )
  const [endDate, setEndDate] = useQueryParamDate('endDate', getCurrentDate())
  const [isAdjustingTimePunchLog, setIsAdjustingTimePunchLog] = useState(false)
  const { showError, showSuccess } = useToast()

  async function fetchCollaboratorHistory(page: number) {
    const response = await workScheduleService.getCollaboratorHistory(
      String(collaboratorId),
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
    shouldRefetchOnFocus: true,
    isEnabled: Boolean(collaboratorId),
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
    workdayLogDate: Date,
    timeLog: string,
    timePunchPeriod: TimePunchPeriod,
  ) {
    if (!collaboratorId) return

    setIsAdjustingTimePunchLog(true)

    const response = await workScheduleService.adjustTimePunch(
      collaboratorId,
      formatIsoDate(workdayLogDate),
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

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
import type { WorkScheduleDto, WorkdayLogDto } from '@/@core/work-schedule/dtos'
import { AppError } from '@/@core/global/errors'

export function useCollaboratorHistoryPage() {
  const { getCurrentDate } = useDatetime()
  const [date, setDate] = useQueryParamDate('date', getCurrentDate())
  const [collboratorName, setCollboratorName] = useQueryParamString('name')
  const { account } = useAuthContext()
  const { workScheduleService } = useApi()
  const { showError, showSuccess } = useToast()
  const [isAdjustingTimePunchLog, setIsAdjustingTimePunchLog] = useState(false)

  async function fetchCollaboratorHistory(page: number) {
    if (!account?.collaboratorId) throw new Error()

    const startDate = date
    const endDate = new Date(date.getTime())
    const response = await workScheduleService.reportCollaboratorHistory(
      account.collaboratorId,
      startDate,
      endDate,
      page,
    )
    return response.body
  }

  const { data, page, pagesCount, isFetching, refetch, setPage } = usePaginatedCache({
    key: CACHE.workSchedule.collaboratorHistory.key,
    fetcher: fetchCollaboratorHistory,
    dependencies: [date, account?.collaboratorId],
    shouldRefetchOnFocus: false,
    isEnabled: Boolean(account?.collaboratorId),
  })

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
      showSuccess('Ponto ajustado com sucesso')
    }

    setIsAdjustingTimePunchLog(false)
  }

  console.log(data)

  return {
    workdayLogs: data ?? [],
    date,
    isLoading: isAdjustingTimePunchLog || isFetching,
    page,
    pagesCount,
    handleDateChange,
    handlePageChange,
    handleTimeLogChange,
  }
}

import { CACHE } from '@/@core/global/constants'
import { PaginationResponse } from '@/@core/global/responses'
import { useDatetime } from '@/ui/global/hooks/use-datetime'
import { useQueryParamString } from '@/ui/global/hooks/use-query-param-string'
import { useQueryParamDate } from '@/ui/global/hooks/use-query-param-date'
import { usePaginatedCache } from '@/ui/global/hooks/use-paginated-cache'
import { useApi } from '@/ui/global/hooks'
import { useQueryParamNumber } from '@/ui/global/hooks/use-query-param-number'

export function useSectorHistoryPage() {
  const { getCurrentDate } = useDatetime()
  const [date, setDate] = useQueryParamDate('date', getCurrentDate())
  const [collboratorName, setCollboratorName] = useQueryParamString('name')
  const [page, setPage] = useQueryParamNumber('page', 1)
  const { workScheduleService } = useApi()

  function handleCollaboratorNameChange(name: string) {
    setCollboratorName(name)
  }

  function handleDateChange(date: Date) {
    setDate(date)
  }

  function handlePageChange(page: number) {
    setPage(page)
  }

  async function fetchSectorHistory(page: number) {
    const response = await workScheduleService.reportSectorHistory(date, page)
    return response.body
  }

  const { data, totalItemsCount, isFetching } = usePaginatedCache({
    key: CACHE.workSchedule.sectorHistory.key,
    fetcher: fetchSectorHistory,
    dependencies: [date, collboratorName],
    shouldRefetchOnFocus: false,
  })

  console.log({ date })

  return {
    workdayLogs: data,
    collboratorName,
    date,
    isFetching,
    page,
    totalPagesCount: Math.ceil(totalItemsCount / PaginationResponse.itemsPerPage),
    handleCollaboratorNameChange,
    handleDateChange,
    handlePageChange,
  }
}

import { CACHE } from '@/@core/global/constants'
import { useRest } from '@/ui/global/hooks'
import { useDatetime } from '@/ui/global/hooks/use-datetime'
import { usePaginatedCache } from '@/ui/global/hooks/use-paginated-cache'
import { useQueryParamDate } from '@/ui/global/hooks/use-query-param-date'
import { useQueryParamString } from '@/ui/global/hooks/use-query-param-string'

export function useTransaction(collaboratorId: string) {
  const { getCurrentDate, minusDays, formatIsoDate } = useDatetime()
  const [startDate, setStartDate] = useQueryParamDate(
    'startDate',
    minusDays(getCurrentDate(), 7),
  )
  const [endDate, setEndDate] = useQueryParamDate('endDate', getCurrentDate())
  const { hourBankService } = useRest()
  const [operation] = useQueryParamString('operation')

  async function fetchHourBank(page: number) {
    const response = await hourBankService.listHourBankTransactions(
      collaboratorId,
      formatIsoDate(startDate),
      formatIsoDate(endDate),
      operation,
      page,
    )
    return response.body
  }

  const { data, page, pagesCount, isFetching, refetch, setPage } = usePaginatedCache({
    key: CACHE.hourBank.transactions.key(collaboratorId),
    fetcher: fetchHourBank,
    dependencies: [startDate, endDate],
    shouldRefetchOnFocus: true,
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

  return {
    transactions: data ?? [],
    operation,
    startDate,
    endDate,
    isLoading: isFetching,
    page,
    pagesCount,
    handleStartDateChange,
    handleEndDateChange,
    handlePageChange,
  }
}

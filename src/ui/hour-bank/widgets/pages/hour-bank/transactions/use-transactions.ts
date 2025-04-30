import { CACHE } from '@/@core/global/constants'
import type { HourBankService } from '@/@core/hour-bank/interfaces'
import { useDatetime } from '@/ui/global/hooks/use-datetime'
import { usePaginatedCache } from '@/ui/global/hooks/use-paginated-cache'
import { useQueryParamDate } from '@/ui/global/hooks/use-query-param-date'
import { useQueryParamString } from '@/ui/global/hooks/use-query-param-string'
import type { HourBankTransactionDto } from '@/@core/hour-bank/dtos'

export function useTransactions(
  collaboratorId: string,
  fallbackTransactions: HourBankTransactionDto[],
  hourBankService: HourBankService,
) {
  const { getCurrentDate, minusDays, formatIsoDate, formatDateTime } = useDatetime()
  const [startDate, setStartDate] = useQueryParamDate(
    'transactionsStartDate',
    minusDays(getCurrentDate(), 7),
  )
  const [endDate, setEndDate] = useQueryParamDate('transactionsEndDate', getCurrentDate())
  const [operation, setOperation] = useQueryParamString('operation', 'all')

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

  const { data, page, pagesCount, isFetching, setPage } = usePaginatedCache({
    key: CACHE.hourBank.key(collaboratorId),
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

  function handleOperationChange(operation: string) {
    setOperation(operation)
  }

  function handlePageChange(page: number) {
    setPage(page)
  }

  return {
    transactions: data ?? [],
    operation,
    startDate,
    endDate,
    isFetchingTransactions: isFetching,
    page,
    pagesCount,
    handleStartDateChange,
    handleEndDateChange,
    handleOperationChange,
    handlePageChange,
  }
}

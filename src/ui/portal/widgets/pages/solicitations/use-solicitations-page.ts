import { useQueryParamString } from '@/ui/global/hooks/use-query-param-string'
import { useQueryParamNumber } from '@/ui/global/hooks/use-query-param-number'
import { useRest } from '@/ui/global/hooks/use-rest'
import { usePaginatedCache } from '@/ui/global/hooks/use-paginated-cache'
import { CACHE } from '@/@core/global/constants'
import { useState } from 'react'
import { useToast } from '@/ui/global/hooks/use-toast'


export function useSolicitationsPage() {
  const [activeTab, setActiveTab] = useQueryParamString('tab', 'day-off')
  const [page, setPage] = useQueryParamNumber('page', 1)
  const { portalService } = useRest()
  const toast = useToast()

  const [totalPages, setTotalPages] = useState(1)
  const [hasMorePages, setHasMorePages] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  async function fetchSolicitations(pageNumber: number) {
    let response;
    
    switch(activeTab) {
      case 'day-off':
        response = await portalService.listDayOffSolicitations(pageNumber)
        break
      case 'excused-absence':
        response = await portalService.listExcusedAbsenceSolicitations(pageNumber)
        break
      case 'paid-overtime':
        response = await portalService.listPaidOvertimeSolicitations(pageNumber)
        break
      default:
        response = await portalService.listDayOffSolicitations(pageNumber)
    }
    
    if (response.isFailure) {
      toast.showError(response.errorMessage)
    }
    
    return response.body
  }
  
  const { pagesCount, isFetching } = usePaginatedCache({
    fetcher: fetchSolicitations,
    key: `portal/solicitations-${activeTab}`,
    isInfinity: false,
    dependencies: [page, activeTab],
  })

  if (pagesCount && totalPages !== pagesCount) {
    setTotalPages(pagesCount)
  }
  
  const shouldHaveMorePages = pagesCount ? page < pagesCount : false
  if (hasMorePages !== shouldHaveMorePages) {
    setHasMorePages(shouldHaveMorePages)
  }
  
  if (pagesCount && page > pagesCount) {
    setPage(pagesCount)
  }
  
  const correctPage = pagesCount && page > pagesCount ? pagesCount : page
  if (currentPage !== correctPage) {
    setCurrentPage(correctPage)
  }

  function handleTabChange(tab: string) {
    setActiveTab(tab)
    setPage(1)
  }

  function handlePreviousPage() {
    if (page > 1) {
      setPage(page - 1)
    }
  }

  function handleNextPage() {
    if (pagesCount && page < pagesCount) {
      setPage(page + 1)
    }
  }

  return {
    activeTab,
    handleTabChange,
    currentPage,
    totalPages,
    hasMorePages,
    handlePreviousPage,
    handleNextPage,
    isFetching,
  }
}

import { CACHE } from '@/@core/global/constants'
import type { PortalService } from '@/@core/portal/interfaces'
import { usePaginatedCache } from '@/ui/global/hooks/use-paginated-cache'
import { useToast } from '@/ui/global/hooks/use-toast'
import { useQueryParamNumber } from '@/ui/global/hooks/use-query-param-number'

export function useExcusedAbsenceSolicitationsAccordion(portalService: PortalService) {
  const { showError, showSuccess } = useToast()
  const [page, setPage] = useQueryParamNumber('page', 1)

  async function fetchSolicitations(page: number) {
    const response = await portalService.listExcusedAbsenceSolicitations(page)
    if (response.isFailure) {
      response.throwError()
    }
    return response.body
  }

  async function handleSolicitationApprove(
    solicitationId: string,
    feedbackMessage?: string,
  ) {
    const response = await portalService.approveExcusedAbsenceSolicitation(
      solicitationId,
      feedbackMessage,
    )
    if (response.isFailure) {
      showError(response.errorMessage)
    }
    if (response.isSuccess) {
      refetch()
      showSuccess('Solicitação aprovada com sucesso')
    }
  }

  async function handleSolicitationCancel(
    solicitationId: string,
  ) {
    const response = await portalService.cancelSolicitation(solicitationId)
    if (response.isFailure) {
      showError(response.errorMessage)
    }
    if (response.isSuccess) {
      refetch()
      showSuccess('Solicitação cancelada com sucesso')
    }
  }
  async function handleSolicitationDeny(
    solicitationId: string,
    feedbackMessage?: string,
  ) {
    const response = await portalService.denySolicitation(solicitationId, feedbackMessage)
    if (response.isFailure) {
      showError(response.errorMessage)
    }
    if (response.isSuccess) {
      refetch()
      showSuccess('Solicitação negada com sucesso')
    }
  }

  const { data, isFetching, isRefetching, refetch, pagesCount } = usePaginatedCache({
    fetcher: fetchSolicitations,
    key: CACHE.portal.excusedabsenceSolicitations.key,
    isInfinity: false,
    dependencies: [page],
  })

  return {
    solicitations: data ?? [],
    isFetchingSolicitations: isFetching || isRefetching,
    currentPage: page,
    totalPages: pagesCount,
    handleSolicitationApprove,
    handleSolicitationDeny,
    handleSolicitationCancel,
    onPageChange: setPage,
  }
}

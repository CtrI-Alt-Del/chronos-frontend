import { CACHE } from '@/@core/global/constants'
import type { PortalService } from '@/@core/portal/interfaces'
import { usePaginatedCache } from '@/ui/global/hooks/use-paginated-cache'
import { useToast } from '@/ui/global/hooks/use-toast'

export function useTimePunchAdjustmentSolicitationsAccordion(
  portalService: PortalService,
) {
  const { showError, showSuccess } = useToast()

  async function fetchSolicitations(page: number) {
    const response = await portalService.listTimePunchLogAdjustmentSolicitations(page)
    if (response.isFailure) {
      response.throwError()
    }
    return response.body
  }

  async function handleSolicitationApprove(
    solicitationId: string,
    feedbackMessage?: string,
  ) {
    const response = await portalService.approveTimePunchLogAdjustmentSolicitation(
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

  async function handleSolicitationCancel(solicitationId: string) {
    const response = await portalService.cancelSolicitation(solicitationId)
    if (response.isFailure) {
      showError(response.errorMessage)
    }
    if (response.isSuccess) {
      refetch()
      showSuccess('Solicitação cancelada com sucesso')
    }
  }

  const { data, isFetching, isRefetching, refetch, page, pagesCount, setPage } =
    usePaginatedCache({
      fetcher: fetchSolicitations,
      key: CACHE.portal.timePunchLogAdjustmentSolicitations.key,
      isInfinity: true,
      dependencies: [],
    })
  return {
    solicitations: data ?? [],
    isFetchingSolicitations: isFetching || isRefetching,
    handleSolicitationApprove,
    handleSolicitationDeny,
    handleSolicitationCancel,
    handlePageChange: setPage,
    currentPage: page,
    totalPages: pagesCount,
  }
}

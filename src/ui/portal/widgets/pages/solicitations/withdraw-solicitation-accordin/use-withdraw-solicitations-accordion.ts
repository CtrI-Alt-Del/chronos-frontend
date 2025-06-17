import { CACHE } from '@/@core/global/constants'
import type { PortalService } from '@/@core/portal/interfaces'
import { usePaginatedCache } from '@/ui/global/hooks/use-paginated-cache'
import { useToast } from '@/ui/global/hooks/use-toast'

export function useWithdrawSolicitationsAccordion(portalService: PortalService) {
  const { showError, showSuccess } = useToast()

  async function fetchSolicitations(page: number) {
    const response = await portalService.listWithdrawSolicitations(page)
    if (response.isFailure) {
      response.throwError()
    }
    console.log('[WithdrawSolicitationsAccordion] API response:', response.body)
    return response.body
  }

  async function handleSolicitationApprove(
    solicitationId: string,
    feedbackMessage?: string,
  ) {
    const response = await portalService.approveWorkLeaveSolicitation(
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

  const { data, isFetching, isRefetching, page, pagesCount, setPage, refetch } =
    usePaginatedCache({
      fetcher: fetchSolicitations,
      key: CACHE.portal.dayOffSolicitations.key,
      isInfinity: true,
      dependencies: [],
    })

  return {
    solicitations: data ?? [],
    isFetchingSolicitations: isFetching || isRefetching,
    currentPage: page,
    totalPages: pagesCount,
    handleSolicitationApprove,
    handleSolicitationDeny,
    handleSolicitationCancel,
    handlePageChange: setPage,
  }
}


import { CACHE } from '@/@core/global/constants'
import type { PortalService } from '@/@core/portal/interfaces'
import { usePaginatedCache } from '@/ui/global/hooks/use-paginated-cache'
import { useToast } from '@/ui/global/hooks/use-toast'

export function useDayOffScheduleAdjustmentSolicitationAccordn(portalService: PortalService) {
  const { showError, showSuccess } = useToast()

  async function fetchSolicitations(page: number) {
    const response = await portalService.listDayOffScheduleAdjustmentSolicitations(page)
    if (response.isFailure) {
      response.throwError()
    }
    return response.body
  }

  async function handleSolicitationApprove(
    solicitationId: string,
    feedbackMessage?: string,
  ) {
    const response = await portalService.approveDayOffScheduleAdjustmentSolicitation(
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

  const { data, isFetching, isRefetching, refetch } = usePaginatedCache({
    fetcher: fetchSolicitations,
    key: CACHE.portal.dayOffScheduleAdjustmentSolicitations.key,
    isInfinity: true,
    dependencies: [],
  })
  console.log(data) 
  return {
    solicitations: data ?? [],
    isFetchingSolicitations: isFetching || isRefetching,
    handleSolicitationApprove,
    handleSolicitationDeny,
  }
}

import { CACHE } from '@/@core/global/constants'
import type { PortalService } from '@/@core/portal/interfaces'
import { ROUTES } from '@/constants'
import { usePaginatedCache } from '@/ui/global/hooks/use-paginated-cache'
import { useToast } from '@/ui/global/hooks/use-toast'
import { useRouter } from 'next/navigation'

export function useDayOffScheduleAdjustmentSolicitationAccordn(
  portalService: PortalService,
) {
  const { showError, showSuccess } = useToast()
  const router = useRouter()

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
    collaboratorId?: string,
  ) {
    const response = await portalService.approveDayOffScheduleAdjustmentSolicitation(
      solicitationId,
      feedbackMessage,
    )
    if (collaboratorId) {
      router.push(ROUTES.collaboration.collaborator(collaboratorId as string))
    }
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
  const { data, isFetching, isRefetching, refetch } = usePaginatedCache({
    fetcher: fetchSolicitations,
    key: CACHE.portal.dayOffScheduleAdjustmentSolicitations.key,
    isInfinity: true,
    dependencies: [],
  })
  return {
    solicitations: data ?? [],
    isFetchingSolicitations: isFetching || isRefetching,
    handleSolicitationApprove,
    handleSolicitationDeny,
    handleSolicitationCancel,
  }
}

import { CACHE } from '@/@core/global/constants'
import type { PortalService } from '@/@core/portal/interfaces'
import { usePaginatedCache } from '@/ui/global/hooks/use-paginated-cache'
import { useToast } from '@/ui/global/hooks/use-toast'

export function usePaidOvertimeSolicitationsAccordion(portalService: PortalService) {
  const { showError } = useToast()

  async function fetchSolicitations(page: number) {
    const response = await portalService.listPaidOvertimeSolicitations(page)
    if (response.isFailure) {
      response.throwError()
    }
    return response.body
  }

  async function handleSolicitationApprove(feedbackMessage?: string) {
    const response = await portalService.approvePaidOvertimeSolicitation(feedbackMessage)
    if (response.isFailure) {
      showError(response.errorMessage)
    }
    if (response.isSuccess) {
      refetch()
    }
  }

  async function handleSolicitationDeny(feedbackMessage?: string) {
    const response = await portalService.denySolicitation(feedbackMessage)
    if (response.isFailure) {
      showError(response.errorMessage)
    }
    if (response.isSuccess) {
      refetch()
    }
  }

  const { data, isFetching, refetch } = usePaginatedCache({
    fetcher: fetchSolicitations,
    key: CACHE.portal.solicitations.key,
    isInfinity: true,
    dependencies: [],
  })

  return {
    solicitations: data ?? [],
    isFetchingSolicitations: isFetching,
    handleSolicitationApprove,
    handleSolicitationDeny,
  }
}

import { CACHE } from '@/@core/global/constants'
import { useAuthContext } from '@/ui/auth/hooks/use-auth-context'
import { useApi, useCache } from '@/ui/global/hooks'
import { useToast } from '@/ui/global/hooks/use-toast'
import { useState } from 'react'

export function useSolicitationPage() {
  const { solicitationService } = useApi()
  const { showError, showSuccess } = useToast()
  const [isResolvingSolicitation, setIsResolvingSolicitation] = useState<boolean>(false)
  async function fetchSolicitations() {
    const response = await solicitationService.listSolicitations()
    return response.body
  }
  const { data, isFetching, refetch } = useCache({
    fetcher: fetchSolicitations,
    key: CACHE.solicitation.solicitations.key,
    dependencies: [],
  })
  async function handleDenySolicitation(solicitationId: string) {
    setIsResolvingSolicitation(true)
    const response = await solicitationService.resolveSolicitation(
      solicitationId,
      'DENIED',
    )
    if (response.isSuccess) {
      showSuccess('Solicitação negada com sucesso')
      refetch()
    }
    if (response.isFailure) {
      showError(response.errorMessage)
    }
    setIsResolvingSolicitation(false)
    refetch()
  }
  async function handleApproveSolicitation(solicitationId: string) {
    setIsResolvingSolicitation(true)
    const response = await solicitationService.resolveSolicitation(
      solicitationId,
      'APPROVED',
    )
    if (response.isSuccess) {
      showSuccess('Solicitação aprovada com sucesso')
      refetch()
    }
    if (response.isFailure) {
      showError(response.errorMessage)
    }
    setIsResolvingSolicitation(false)
    refetch()
  }

  return {
    solicitations: data,
    isResolvingSolicitation,
    refetch,
    isLoading: isFetching,
    handleDenySolicitation,
    handleApproveSolicitation,
  }
}

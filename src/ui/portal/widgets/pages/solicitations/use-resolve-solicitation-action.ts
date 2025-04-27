import { useAction } from 'next-safe-action/hooks'

import { portalActions } from '@/server/next-safe-action'
import type { SolicitationDto } from '@/@core/portal/dtos'
import { useToast } from '@/ui/global/hooks/use-toast'

export function useResolveSolicitationAction() {
  const { showError, showSuccess } = useToast()
  const { executeAsync, isPending } = useAction(portalActions.resolveSolicitation, {
    onSuccess() {
      showSuccess('Solicitacao resolvida com sucesso')
    },
    onError(error) {
      if (error.error.serverError) {
        showError(error.error.serverError)
      }
    },
  })
  async function resolveSolicitation(
    solicitation: SolicitationDto,
    status: 'APPROVED' | 'DENIED',
  ) {
    await executeAsync({
      id: solicitation.id,
      collaboratorId: solicitation.senderResponsible?.entity?.id as string,
      status: status,
      feedbackMessage: '',
      type: solicitation.type ?? 'DAY_OFF_SCHEDULE',
    })
  }
  return { resolveSolicitation, isResolvingSolicitation: isPending }
}

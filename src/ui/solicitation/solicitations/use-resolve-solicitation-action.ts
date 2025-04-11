import type { SolicitationDto } from '@/@core/solicitation/dtos'
import { solicitationActions } from '@/server/next-safe-action'
import { useToast } from '@/ui/global/hooks/use-toast'
import { useAction } from 'next-safe-action/hooks'

export function useResolveSolicitationAction() {
  const { showError, showSuccess } = useToast()
  const { executeAsync, isPending } = useAction(solicitationActions.resolveSolicitation, {
    onSuccess() {
      showSuccess('Solicitacao aceita com sucesso')
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
    const result =await executeAsync({
      id: solicitation.id,
      collaboratorId: solicitation.senderResponsible?.dto.id as string,
      status: status,
      feedbackMessage: "",
      type: solicitation.type ?? "DAY_OFF_SCHEDULE"

    })
    
  }
  return { resolveSolicitation, isResolvingSolicitation: isPending }
}

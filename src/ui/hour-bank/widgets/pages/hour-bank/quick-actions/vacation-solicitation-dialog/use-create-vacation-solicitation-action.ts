import { useAction } from 'next-safe-action/hooks'

import { portalActions } from '@/server/next-safe-action'
import { useToast } from '@/ui/global/hooks/use-toast'

export function useCreateVacationSolicitationAction() {
  const { showError, showSuccess } = useToast()
  const { executeAsync, isExecuting } = useAction(
    portalActions.createVacationSolicitation,
    {
      onError(error) {
        if (error.error.serverError) {
          showError(error.error.serverError)
        }
      },
      onSuccess() {
        showSuccess('Solicitação de férias criada com sucesso!')
      },
    },
  )

  async function createVacationSolicitation(
    startedAt: string,
    endedAt: string,
  ): Promise<void> {
    await executeAsync({
      startedAt,
      endedAt,
    })
  }

  return {
    isCreatingSolicitation: isExecuting,
    createVacationSolicitation,
  }
}

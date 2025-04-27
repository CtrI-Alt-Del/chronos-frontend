import { solicitationActions } from '@/server/next-safe-action'
import { useToast } from '@/ui/global/hooks/use-toast'
import { useAction } from 'next-safe-action/hooks'

export function useCreateDayOffSolicitationAction() {
  const { showError, showSuccess } = useToast()
  const { executeAsync, isExecuting } = useAction(
    portalActions.createDayOffSolicitation,
    {
      onSuccess() {
        showSuccess('Solicitação de folga criada com sucesso')
      },
      onError(error) {
        if (error.error.serverError) {
          showError(error.error.serverError)
        }
      },
    },
  )
  async function createDayOffSolicitation(
    dayOff: string,
    justificationType: {
      id: string
      name: string
      needsAttachment: string
    },
    description: string,
    file?: File,
  ) {
    await executeAsync({
      dayOff,
      justificationType,
      description,
      file,
    })
  }
  return {
    createDayOffSolicitation,
    isCreatingSolicitation: isExecuting,
  }
}

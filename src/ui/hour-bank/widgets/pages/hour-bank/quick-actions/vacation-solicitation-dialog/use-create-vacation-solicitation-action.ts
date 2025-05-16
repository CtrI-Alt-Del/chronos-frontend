import type { WithdrawSolicitationDto } from '@/@core/portal/dtos'
import { portalActions } from '@/server/next-safe-action'
import { useToast } from '@/ui/global/hooks/use-toast'
import { useAction } from 'next-safe-action/hooks'

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
  async function createVacationSolicitation(vacationDays: string[]): Promise<void> {
    await executeAsync({
      vacationDays,
    })
  }
  return {
    createVacationSolicitation,
    isCreatingSolicitation: isExecuting,
  }
}

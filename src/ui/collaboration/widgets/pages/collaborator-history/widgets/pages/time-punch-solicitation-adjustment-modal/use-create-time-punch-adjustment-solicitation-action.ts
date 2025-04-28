import { portalActions } from '@/server/next-safe-action'
import { useToast } from '@/ui/global/hooks/use-toast'
import { useAction } from 'next-safe-action/hooks'

export function useCreateTimePunchAdjustmentSolicitationAction() {
  const { showError, showSuccess } = useToast()
  const { executeAsync, isPending } = useAction(
    portalActions.createTimePunchAdjustmentSolicitation,
    {
      onSuccess() {
        showSuccess('Solicitação de ajuste de ponto criada com sucesso')
      },
      onError(error) {
        if (error.error.serverError) {
          console.log(error.error)
          showError(error.error.serverError)
        }
      },
    },
  )
  async function createTimePunchAdjustmentSolicitation(
    time: string,
    period: string,
    workdayLogDate: Date,
    reason: string,
  ) {
    await executeAsync({
      time,
      period,
      workdayLogDate,
      reason,
    })
  }
  return { createTimePunchAdjustmentSolicitation, isCreatingSolicitation: isPending }
}

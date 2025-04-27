import type { DayOffScheduleDto } from '@/@core/work-schedule/dtos'
import { solicitationActions } from '@/server/next-safe-action'
import { useToast } from '@/ui/global/hooks/use-toast'
import { useAction } from 'next-safe-action/hooks'

export function useCreateDayOffScheduleSolicitationAction() {
  const { showError, showSuccess } = useToast()
  const { executeAsync, isPending } = useAction(
    portalActions.createDayOffScheduleAdjustmentSolicitation,
    {
      onSuccess() {
        showSuccess('Solicitação de ajuste de escala de folgas criada com sucesso')
      },
      onError(error) {
        if (error.error.serverError) {
          console.log(error.error)
          showError(error.error.serverError)
        }
      },
    },
  )
  async function createDayOffScheduleSolicitation(
    dayOffSchedule: DayOffScheduleDto,
    description?: string,
  ) {
    await executeAsync({
      description: description,
      dayOffSchedule,
    })
  }
  return { createDayOffScheduleSolicitation, isCreatingSolicitation: isPending }
}

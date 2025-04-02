import type { DayOffScheduleDto } from '@/@core/work-schedule/dtos'
import { workScheduleActions } from '@/server/next-safe-action'
import { useToast } from '@/ui/global/hooks/use-toast'
import { useAction } from 'next-safe-action/hooks'

export function useUpdateDaysOffScheduleAction(collaboratorId?: string) {
  const { showError, showSuccess } = useToast()
  const { executeAsync, isPending } = useAction(
    workScheduleActions.updateDayOffSchedule,
    {
      onSuccess() {
        showSuccess('Escala de folgas atualizado')
      },
      onError(error) {
        if (error.error.serverError) showError(error.error.serverError)
      },
    },
  )

  async function updateDaysOffSchedule(dayOffSchedule: DayOffScheduleDto) {
    if (collaboratorId)
      await executeAsync({
        collaboratorId,
        dayOffSchedule,
      })
  }

  return {
    updateDaysOffSchedule,
    isUpdating: isPending,
  }
}

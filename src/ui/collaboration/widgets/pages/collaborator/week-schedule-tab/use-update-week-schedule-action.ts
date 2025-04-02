import { useAction } from 'next-safe-action/hooks'

import type { WeekdayScheduleDto } from '@/@core/work-schedule/dtos'
import { workScheduleActions } from '@/server/next-safe-action'
import { useToast } from '@/ui/global/hooks/use-toast'

export function useUpdateWeekScheduleAction(collaboratorId?: string) {
  const { showError, showSuccess } = useToast()
  const { executeAsync, isPending } = useAction(workScheduleActions.updateWeekSchedule, {
    onSuccess() {
      showSuccess('Escala de horário atualizado')
    },
    onError(error) {
      if (error.error.serverError) showError(error.error.serverError)
    },
  })

  async function updateWeekSchedule(weekSchedule: WeekdayScheduleDto[]) {
    if (collaboratorId) await executeAsync({ collaboratorId, weekSchedule })
  }

  return {
    updateWeekSchedule,
    isUpdating: isPending,
  }
}

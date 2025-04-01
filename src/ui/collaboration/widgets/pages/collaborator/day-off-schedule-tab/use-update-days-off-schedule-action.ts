import type { DayOffScheduleDto } from '@/@core/work-schedule/dtos'
import { workScheduleActions } from '@/server/next-safe-action'
import { useAction } from 'next-safe-action/hooks'

export function useUpdateDaysOffScheduleAction(collaboratorId?: string) {
  const { executeAsync, isPending } = useAction(workScheduleActions.updateDayOffSchedule)

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

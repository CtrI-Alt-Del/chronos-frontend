import type { WeekdayScheduleDto } from '@/@core/work-schedule/dtos'
import { workScheduleActions } from '@/server/next-safe-action'
import { useAction } from 'next-safe-action/hooks'

export function useUpdateWeekScheduleAction(collaboratorId?: string) {
  const { executeAsync, isPending } = useAction(workScheduleActions.updateWeekSchedule)

  async function updateWeekSchedule(weekSchedule: WeekdayScheduleDto[]) {
    if (collaboratorId) await executeAsync({ collaboratorId, weekSchedule })
  }

  return {
    updateWeekSchedule,
    isUpdating: isPending,
  }
}

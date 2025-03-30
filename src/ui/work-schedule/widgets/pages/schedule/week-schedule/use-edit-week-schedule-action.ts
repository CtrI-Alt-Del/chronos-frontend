import type { TimePunchDto } from '@/@core/work-schedule/dtos'
import { workScheduleActions } from '@/server/next-safe-action'
import { useAction } from 'next-safe-action/hooks'

export function useEditWeekScheduleAction(workScheduleId?: string) {
  const { executeAsync, isPending } = useAction(workScheduleActions.editWeekSchedule)

  async function editWeekSchedule(timePunchesSchedule: TimePunchDto[]) {
    if (workScheduleId) await executeAsync({ workScheduleId, timePunchesSchedule })
  }

  return {
    editWeekSchedule,
    isEditingTimePunchSchedule: isPending,
  }
}

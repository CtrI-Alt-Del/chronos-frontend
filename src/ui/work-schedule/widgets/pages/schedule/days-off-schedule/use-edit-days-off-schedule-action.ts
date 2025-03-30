import { workScheduleActions } from '@/server/next-safe-action'
import { useAction } from 'next-safe-action/hooks'

export function useEditDaysOffScheduleAction(workScheduleId?: string) {
  const { executeAsync, isPending } = useAction(workScheduleActions.editDaysOffSchedule)

  async function editDaysOffSchedule(
    workdaysCount: number,
    daysOffCount: number,
    daysOff: string[],
  ) {
    if (workScheduleId)
      await executeAsync({
        workScheduleId,
        daysOffSchedule: {
          workdaysCount,
          daysOffCount,
          daysOff,
        },
      })
  }

  return {
    editDaysOffSchedule,
    isEditingDaysOffSchedule: isPending,
  }
}

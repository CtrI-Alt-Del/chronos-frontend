import { workScheduleActions } from '@/server/next-safe-action'
import { useAction } from 'next-safe-action/hooks'

export function useEditWorkScheduleDescriptionAction(workScheduleId?: string) {
  const { executeAsync, isPending } = useAction(
    workScheduleActions.editWorkScheduleDescription,
  )

  async function editWorkScheduleDescription(description: string) {
    if (workScheduleId) await executeAsync({ workScheduleId, description })
  }

  return {
    editWorkScheduleDescription,
    isEditing: isPending,
  }
}

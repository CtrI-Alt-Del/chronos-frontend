import type { WorkScheduleDto } from '@/@core/work-schedule/dtos'
import { workScheduleActions } from '@/server/next-safe-action'
import { useToast } from '@/ui/global/hooks/use-toast'
import { useAction } from 'next-safe-action/hooks'

export function useCreateWorkScheduleAction() {
  const toast = useToast()
  const { executeAsync, isPending } = useAction(workScheduleActions.createWorkSchedule, {
    onError: ({ error }) => {
      if (error.serverError) toast.showError(error.serverError)
    },
  })

  async function createWorkSchedule(workSchedule: WorkScheduleDto) {
    await executeAsync(workSchedule)
  }

  return {
    createWorkSchedule,
    isCreatingWorkSchedule: isPending,
  }
}

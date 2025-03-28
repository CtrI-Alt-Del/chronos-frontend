import { workScheduleActions } from '@/server/next-safe-action'
import { useAction } from 'next-safe-action/hooks'

export function usePunchTimeAction() {
  const { executeAsync, isPending } = useAction(workScheduleActions.punchTime, {})

  async function punchTime(timePunchLogId: string, time: Date) {
    await executeAsync({ timePunchLogId, time })
  }

  return {
    punchTime,
    isPuchingTime: isPending,
  }
}

import { workScheduleActions } from '@/server/next-safe-action'
import { useAction } from 'next-safe-action/hooks'

export function usePunchTimeAction() {
  const { executeAsync, isPending } = useAction(workScheduleActions.punchTime, {})

  async function punchTime(workdayLogId: string, time: string) {
    console.log(workdayLogId, time)
    await executeAsync({ workdayLogId, time })
  }

  return {
    punchTime,
    isPuchingTime: isPending,
  }
}

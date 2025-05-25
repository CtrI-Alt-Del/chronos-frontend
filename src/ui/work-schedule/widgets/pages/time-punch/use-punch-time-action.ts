import { useAction } from 'next-safe-action/hooks'

import { workScheduleActions } from '@/server/next-safe-action'

export function usePunchTimeAction() {
  const { executeAsync, isPending } = useAction(workScheduleActions.punchTime, {})

  async function punchTime(workdayLogId: string, time: string) {
    await executeAsync({ workdayLogId, time })
  }

  return {
    punchTime,
    isPuchingTime: isPending,
  }
}

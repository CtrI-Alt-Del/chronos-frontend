import { workScheduleActions } from '@/server/next-safe-action'
import { WorkedTimeView } from './worked-time-view'

type WorkedTimeProps = {
  collaboratorId: string
}

export const WorkedTime = async ({ collaboratorId }: WorkedTimeProps) => {
  const workTimeResponse = await workScheduleActions.getWorkTime({
    collaboratorId,
  })
  if (!workTimeResponse?.data?.workTime) return

  return <WorkedTimeView workTime={workTimeResponse?.data?.workTime} />
}

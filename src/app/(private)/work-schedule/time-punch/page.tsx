import { collaborationActions, workScheduleActions } from '@/server/next-safe-action'
import { TimePunchPage } from '@/ui/work-schedule/widgets/pages/time-punch'

const Page = async () => {
  const workScheduleResponse = await workScheduleActions.getTodayWorkdayLog()
  const collaborationResponse = await collaborationActions.getCollaboratorProfile()

  if (!workScheduleResponse?.data) return
  if (!collaborationResponse?.data) return

  return (
    <TimePunchPage
      workdayLog={workScheduleResponse.data.workdayLog}
    />
  )
}

export default Page

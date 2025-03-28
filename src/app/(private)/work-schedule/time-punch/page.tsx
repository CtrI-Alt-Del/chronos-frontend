import { collaborationActions, workScheduleActions } from '@/server/next-safe-action'
import { TimePunchPage } from '@/ui/work-schedule/widgets/pages/time-punch'

const Page = async () => {
  const workScheduleResponse = await workScheduleActions.getTodayWorkdayLog()
  const collaborationResponse = await collaborationActions.getCollaboratorProfile()

  if (!workScheduleResponse?.data) return
  if (!collaborationResponse?.data) return

  console.log(workScheduleResponse?.data)

  return (
    <TimePunchPage
      workdayLog={workScheduleResponse.data.workdayLog}
      collaborationName={collaborationResponse.data.collaborator.name}
    />
  )
}

export default Page

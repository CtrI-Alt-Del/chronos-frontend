import { collaborationActions, workScheduleActions } from '@/server/next-safe-action'
import { SolicitationsPage } from '@/ui/solicitation/solicitations'

const Page = async () => {
  const collaborationResponse = await collaborationActions.getCollaboratorProfile()
  const workScheduleResponse = await workScheduleActions.getTodayWorkdayLog()
  if (!collaborationResponse?.data) return
  if (!workScheduleResponse?.data) return

  return (
    <SolicitationsPage
      userRole={collaborationResponse.data.collaborator.role}
      workdayLog={workScheduleResponse.data.workdayLog}
    />
  )
}

export default Page

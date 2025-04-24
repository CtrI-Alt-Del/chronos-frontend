import { collaborationActions, workScheduleActions } from '@/server/next-safe-action'
import { HoursBankPage } from '@/ui/work-schedule/widgets/pages/hours-bank'

const Page = async () => {
  const collaborationResponse = await collaborationActions.getCollaboratorProfile()

  if (!collaborationResponse?.data) return

  return (
    <HoursBankPage
      collaboratorId={collaborationResponse.data.collaborator.id ?? ""}
      collaboratorName={collaborationResponse.data.collaborator.name ?? ""}
    />
  )
}

export default Page 
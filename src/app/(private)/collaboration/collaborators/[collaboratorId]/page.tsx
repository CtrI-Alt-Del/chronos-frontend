import type { NextParams } from '@/api/next/types'
import { collaborationActions, workScheduleActions } from '@/server/next-safe-action'
import { CollaboratorPage } from '@/ui/collaboration/widgets/pages/collaborator'

export default async function Page({ params }: NextParams<'collaboratorId'>) {
  const { collaboratorId } = await params
  const collaboratoResponse = await collaborationActions.getCollaborator({
    collaboratorId,
  })
  const dayOffScheduleResponse = await workScheduleActions.getDayOffSchedule({
    collaboratorId,
  })

  const collaborator = collaboratoResponse?.data?.collaborator
  const dayOffSchedule = dayOffScheduleResponse?.data?.dayOffSchedule

  return <CollaboratorPage collaborator={collaborator} dayOffSchedule={dayOffSchedule} />
}

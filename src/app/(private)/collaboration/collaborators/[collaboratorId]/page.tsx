import type { NextParams } from '@/api/next/types'
import { collaborationActions, workScheduleActions } from '@/server/next-safe-action'
import { CollaboratorPage } from '@/ui/collaboration/widgets/pages/collaborator'

export default async function Page({ params }: NextParams<'collaboratorId'>) {
  const collaboratoResponse = await collaborationActions.getCollaborator({
    collaboratorId: params.collaboratorId,
  })
  const weekScheduleResponse = await workScheduleActions.getWeekSchedule({
    collaboratorId: params.collaboratorId,
  })
  const dayOffScheduleResponse = await workScheduleActions.getDayOffSchedule({
    collaboratorId: params.collaboratorId,
  })
  if (!collaboratoResponse?.data?.collaborator) return
  if (!weekScheduleResponse?.data?.weekSchedule) return
  if (!dayOffScheduleResponse?.data?.dayOffSchedule) return

  const collaborator = collaboratoResponse.data.collaborator
  const weekSchedule = weekScheduleResponse.data.weekSchedule
  const dayOffSchedule = dayOffScheduleResponse.data.dayOffSchedule

  return (
    <CollaboratorPage
      collaborator={collaborator}
      weekSchedule={weekSchedule}
      dayOffSchedule={dayOffSchedule}
    />
  )
}

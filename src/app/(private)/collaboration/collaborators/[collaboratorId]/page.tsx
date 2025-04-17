import type { NextParams } from '@/api/next/types'
import {
  authActions,
  collaborationActions,
  workScheduleActions,
} from '@/server/next-safe-action'
import { CollaboratorPage } from '@/ui/collaboration/widgets/pages/collaborator'
import { notFound, redirect } from 'next/navigation'

export default async function Page({ params }: NextParams<'collaboratorId'>) {
  const { collaboratorId } = await params
  const collaboratoResponse = await collaborationActions.getCollaborator({
    collaboratorId,
  })
  const dayOffScheduleResponse = await workScheduleActions.getDayOffSchedule({
    collaboratorId,
  })
  if (!collaboratoResponse?.data?.collaborator) return
  if (!dayOffScheduleResponse?.data?.dayOffSchedule) return

  const collaborator = collaboratoResponse.data.collaborator
  const dayOffSchedule = dayOffScheduleResponse.data.dayOffSchedule

  return <CollaboratorPage collaborator={collaborator} dayOffSchedule={dayOffSchedule} />
}

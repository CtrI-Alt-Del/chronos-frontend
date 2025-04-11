import type { NextParams } from '@/api/next/types'
import { authActions, collaborationActions, workScheduleActions } from '@/server/next-safe-action'
import { CollaboratorPage } from '@/ui/collaboration/widgets/pages/collaborator'
import { notFound, redirect } from 'next/navigation'

export default async function Page({ params }: NextParams<'collaboratorId'>) {

  const { collaboratorId } = await params

  const currentProfile = await collaborationActions.getCollaboratorProfile()


  if (!currentProfile?.data?.collaborator) return
  const currentUser = currentProfile.data.collaborator
  console.log(currentUser)
  if (
    !currentUser.role.includes('admin') &&
    !currentUser.role.includes('manager') &&
    currentUser.id !== collaboratorId
  ) {
    console.log("caca")
    
  }

  const collaboratoResponse = await collaborationActions.getCollaborator({
    collaboratorId: collaboratorId,
  })
  const weekScheduleResponse = await workScheduleActions.getWeekSchedule({
    collaboratorId: collaboratorId,
  })
  const dayOffScheduleResponse = await workScheduleActions.getDayOffSchedule({
    collaboratorId: collaboratorId,
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

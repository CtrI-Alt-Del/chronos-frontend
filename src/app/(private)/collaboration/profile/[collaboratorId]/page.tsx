import type { NextParams } from '@/api/next/types'
import { collaborationActions, workScheduleActions } from '@/server/next-safe-action'
import { ProfilePage } from '@/ui/collaboration/widgets/pages/profile'

export default async function Page({ params }: NextParams<'collaboratorId'>) {
  const response = await collaborationActions.getCollaborator({
    collaboratorId: params.collaboratorId,
  })
  if (!response?.data?.collaborator) return
  const collaborator = response.data.collaborator

  return <ProfilePage collaborator={collaborator} />
}

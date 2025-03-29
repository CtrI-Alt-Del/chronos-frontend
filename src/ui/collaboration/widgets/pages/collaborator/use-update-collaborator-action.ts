import type { CollaboratorDto } from '@/@core/collaboration/dtos'
import { collaborationActions } from '@/server/next-safe-action'
import { useAction } from 'next-safe-action/hooks'

export function useUpdateCollaboratorAction() {
  const { executeAsync, isPending } = useAction(collaborationActions.updateCollaborator)

  async function updateCollaborator(
    collaboratorId: string,
    collaboratorDto: CollaboratorDto,
    workScheduleId: string,
  ) {
    await executeAsync({ collaboratorId, workScheduleId, collaboratorDto })
  }

  return {
    updateCollaborator,
    isUpdating: isPending,
  }
}

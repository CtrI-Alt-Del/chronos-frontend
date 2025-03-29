import { collaborationActions } from '@/server/next-safe-action'
import { useAction } from 'next-safe-action/hooks'

export function useEnableCollaboratorAction() {
  const { executeAsync, isPending } = useAction(collaborationActions.enableCollaborator)

  async function enableCollaborator(collaboratorId: string) {
    await executeAsync({ collaboratorId })
  }

  return {
    enableCollaborator,
    isEnabling: isPending,
  }
}

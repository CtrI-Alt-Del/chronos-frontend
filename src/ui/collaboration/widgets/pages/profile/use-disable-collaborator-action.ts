import { collaborationActions } from '@/server/next-safe-action'
import { useAction } from 'next-safe-action/hooks'

export function useDisableCollaboratorAction() {
  const { executeAsync, isPending } = useAction(collaborationActions.disableCollaborator)

  async function disableCollaborator(collaboratorId: string) {
    await executeAsync({ collaboratorId })
  }

  return {
    disableCollaborator,
    isDisabling: isPending,
  }
}

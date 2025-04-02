import { useAction } from 'next-safe-action/hooks'

import type { CollaboratorDto } from '@/@core/collaboration/dtos'
import { collaborationActions } from '@/server/next-safe-action'
import { useToast } from '@/ui/global/hooks/use-toast'

export function useUpdateCollaboratorAction(collaboratorId?: string) {
  const { showError, showSuccess } = useToast()
  const { executeAsync, isPending } = useAction(collaborationActions.updateCollaborator, {
    onSuccess() {
      showSuccess('Colaborador atualizado')
    },
    onError(error) {
      if (error.error.serverError) showError(error.error.serverError)
    },
  })

  async function updateCollaborator(collaboratorDto: CollaboratorDto) {
    if (collaboratorId) await executeAsync({ collaboratorId, collaboratorDto })
  }

  return {
    updateCollaborator,
    isUpdating: isPending,
  }
}

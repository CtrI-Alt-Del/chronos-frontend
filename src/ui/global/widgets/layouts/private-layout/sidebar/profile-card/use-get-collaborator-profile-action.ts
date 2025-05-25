import { collaborationActions } from '@/server/next-safe-action'
import { useAction } from 'next-safe-action/hooks'

export function useGetCollaboratorAction() {
  const { executeAsync, isPending } = useAction(
    collaborationActions.getCollaboratorProfile,
  )

  async function getProfile() {
    const response = await executeAsync()
    return response?.data?.collaborator
  }

  return {
    getProfile,
    isLoading: isPending,
  }
}

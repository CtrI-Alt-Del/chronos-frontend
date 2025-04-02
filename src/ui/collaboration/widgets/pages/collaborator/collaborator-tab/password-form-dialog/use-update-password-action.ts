import { authActions } from '@/server/next-safe-action'
import { useToast } from '@/ui/global/hooks/use-toast'
import { useAction } from 'next-safe-action/hooks'

export function useUpdatePasswordAction(collaboratorId: string) {
  const toast = useToast()
  const { executeAsync, isPending } = useAction(authActions.updatePassword, {
    onSuccess: () => {
      toast.showSuccess('Senha atualizada com sucesso!')
    },
  })

  async function updatePassword(password: string) {
    await executeAsync({ collaboratorId, password })
  }

  return {
    updatePassword,
    isUpdating: isPending,
  }
}

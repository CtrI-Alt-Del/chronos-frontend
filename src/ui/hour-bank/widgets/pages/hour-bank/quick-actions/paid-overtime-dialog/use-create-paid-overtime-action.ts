import { useCallback } from 'react'

import { hourBankActions } from '@/server/next-safe-action'
import { useToast } from '@/ui/global/hooks/use-toast'
import { useAction } from 'next-safe-action/hooks'
import { useAuthContext } from '@/ui/auth/hooks/use-auth-context'

export function usePaidOvertimeAction() {
  const toast = useToast()
  const { account } = useAuthContext()

  const { executeAsync, isPending } = useAction(hourBankActions.createPaidOvertime, {
    onSuccess() {
      toast.showSuccess('Hora extra remunerada debitada com sucesso')
    },
    onError(data) {
      console.error('Erro ao debitar hora extra:', data.error)
      if (data.error.serverError) {
        toast.showError(`Erro: ${data.error.serverError}`)
      } else {
        toast.showError('Erro desconhecido ao debitar hora extra')
      }
    },
  })

  const createPaidOvertime = useCallback(async () => {
    if (!account?.id) return

    await executeAsync({
      collaboratorId: account.id,
    })
  }, [executeAsync, account?.id])

  return {
    createPaidOvertime,
    isCreatingPaidOvertime: isPending,
  }
}

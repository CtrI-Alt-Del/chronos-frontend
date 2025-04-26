import { hourBankActions } from '@/server/next-safe-action'
import { useToast } from '@/ui/global/hooks/use-toast'
import { useAction } from 'next-safe-action/hooks'
import { useCallback } from 'react'

export function useCreateTransactionAdjustmentAction() {
  const toast = useToast()
  const { executeAsync, isPending } = useAction(
    hourBankActions.createHourBankTransactionAdjustment,
    {
      onError(data) {
        if (data.error.serverError) toast.showError(data.error.serverError)
      },
    },
  )

  const createTransactionAdjustment = useCallback(
    async (
      collaboratorId: string,
      transactionTime: string,
      transactionOperation: string,
    ) => {
      await executeAsync({ collaboratorId, transactionTime, transactionOperation })
    },
    [executeAsync],
  )

  return { createTransactionAdjustment, isCreatingTransactionAdjustment: isPending }
}

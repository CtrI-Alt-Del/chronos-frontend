import { useCallback } from 'react'

import { portalActions } from '@/server/next-safe-action'
import { useToast } from '@/ui/global/hooks/use-toast'
import { useAction } from 'next-safe-action/hooks'

export function useCreatePaidOvertimeSolicitationAction() {
  const toast = useToast()
  const { executeAsync, isPending } = useAction(
    portalActions.createPaidOvertimeSolicitation,
    {
      onError(data) {
        if (data.error.serverError) toast.showError(data.error.serverError)
      },
    },
  )

  const createSolicitation = useCallback(async () => {
    await executeAsync()
  }, [executeAsync])

  return { createSolicitation, isCreatingSolicitation: isPending }
}

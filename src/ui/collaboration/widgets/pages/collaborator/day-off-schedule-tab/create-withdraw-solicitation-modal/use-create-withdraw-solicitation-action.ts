import type { WorkLeaveSolicitationDto } from '@/@core/portal/dtos'
import { portalActions } from '@/server/next-safe-action'
import { useToast } from '@/ui/global/hooks/use-toast'
import { useAction } from 'next-safe-action/hooks'

export function useCreateWithDrawSolicitationAction() {
  const { showError } = useToast()
  const { isExecuting, executeAsync } = useAction(
    portalActions.createWithdrawSolicitation,
    {
      onError: ({ error }) => {
        if (error.serverError) showError(error.serverError)
      },
    },
  )

  async function createWithdrawSolicitation(
    startedAt: string,
    endedAt: string,
    description?: string,
  ): Promise<WorkLeaveSolicitationDto> {
    const response = await executeAsync({
      startedAt,
      endedAt,
      description,
    })
    return response?.data as WorkLeaveSolicitationDto
  }

  return {
    isCreatingSolicitation: isExecuting,
    createWithdrawSolicitation,
  }
}

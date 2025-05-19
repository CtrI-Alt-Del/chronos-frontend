import type { WithdrawSolicitationDto } from '@/@core/portal/dtos'
import { portalActions } from '@/server/next-safe-action'
import { useAction } from 'next-safe-action/hooks'

export function useCreateWithDrawSolicitationAction() {
  const { executeAsync, isExecuting } = useAction(
    portalActions.createWithdrawSolicitation,
    {
    },
  )
  async function createWithdrawSolicitation(withdrawalDays: string[]): Promise<WithdrawSolicitationDto> {
    const response = await executeAsync({
      withdrawalDays,
    })
    return response?.data as WithdrawSolicitationDto
  }
  return {
    createWithdrawSolicitation,
    isCreatingSolicitation: isExecuting,
  }
}

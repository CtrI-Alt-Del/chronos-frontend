import type { ExcusedAbsenceSolicitationDto } from '@/@core/portal/dtos'
import { portalActions } from '@/server/next-safe-action'
import { useAction } from 'next-safe-action/hooks'

export function useCreateExcuseAbsenceSolicitationAction() {
  const { executeAsync, isExecuting } = useAction(
    portalActions.createExcusedAbsenceSolicitation,
    {
    },
  )
  async function createExcusedAbsenceSolicitation(absenceDate: string): Promise<ExcusedAbsenceSolicitationDto> {
    const response = await executeAsync({
      absenceDate,
    })
    return response?.data as ExcusedAbsenceSolicitationDto
  }
  return {
    createExcusedAbsenceSolicitation,
    isCreatingSolicitation: isExecuting,
  }
}

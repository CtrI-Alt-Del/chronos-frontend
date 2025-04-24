import { CACHE } from '@/@core/global/constants'
import type {
  DayOffScheduleAdjustmentSolicitationDto,
  DayOffSolicitationDto,
  SolicitationDto,
  TimePunchLogAdjustmentSolicitationDto,
} from '@/@core/solicitation/dtos'
import { useAuthContext } from '@/ui/auth/hooks/use-auth-context'
import { useRest, useCache } from '@/ui/global/hooks'
import { useToast } from '@/ui/global/hooks/use-toast'
import { useState } from 'react'
import { useResolveSolicitationAction } from './use-resolve-solicitation-action'

export function useSolicitationPage() {
  const { solicitationService } = useRest()
  const { showError, showSuccess } = useToast()
  const { isResolvingSolicitation, resolveSolicitation } = useResolveSolicitationAction()
  async function fetchSolicitations() {
    const response = await solicitationService.listSolicitations()
    return response.body
  }
  const { data, isFetching, refetch } = useCache({
    fetcher: fetchSolicitations,
    key: CACHE.solicitation.solicitations.key,
    dependencies: [],
  })
  async function handleDenySolicitation(solicitation: SolicitationDto) {
    resolveSolicitation(solicitation, 'DENIED')
  }
  async function handleApproveSolicitation(solicitation: SolicitationDto) {
    resolveSolicitation(solicitation, 'APPROVED')
  }
  const timePunchAdjustmentSolicitations = data?.filter(
    (solicitation) => solicitation.type === 'TIME_PUNCH',
  ) as TimePunchLogAdjustmentSolicitationDto[]
  const dayOffScheduleSolicitations = data?.filter(
    (solicitation) => solicitation.type === 'DAY_OFF_SCHEDULE',
  ) as DayOffScheduleAdjustmentSolicitationDto[]
  const dayOffSolicitations = data?.filter(
    (solicitation) => solicitation.type === 'DAY_OFF',
  ) as DayOffSolicitationDto[]

  return {
    timePunchAdjustmentSolicitations,
    dayOffScheduleSolicitations,
    dayOffSolicitations,
    isResolvingSolicitation,
    refetch,
    isLoading: isFetching,
    handleDenySolicitation,
    handleApproveSolicitation,
  }
}

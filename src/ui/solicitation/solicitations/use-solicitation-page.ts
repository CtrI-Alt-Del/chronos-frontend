import { CACHE } from '@/@core/global/constants'
import type {
  DayOffScheduleAdjustmentSolicitationDto,
  DayOffSolicitationDto,
  SolicitationDto,
  TimePunchLogAdjustmentSolicitationDto,
} from '@/@core/solicitation/dtos'
import { useToast } from '@/ui/global/hooks/use-toast'
import { useResolveSolicitationAction } from './use-resolve-solicitation-action'
import { useRest } from '@/ui/global/hooks/use-rest'
import { useCache } from '@/ui/global/hooks/use-cache'

export function useSolicitationPage() {
  const { solicitationService } = useRest()
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

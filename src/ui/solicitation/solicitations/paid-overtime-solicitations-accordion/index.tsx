import type { DayOffSolicitationDto, SolicitationDto } from '@/@core/solicitation/dtos'
import { useDatetime } from '@/ui/global/hooks/use-datetime'
import { Spinner } from '@heroui/spinner'
import { SolicitationsAccordion } from '../../solicitations-accordion'

type Props = {
  solicitations: DayOffSolicitationDto[] | null
  isLoading: boolean
  userRole: string
  isResolvingSolicitation: boolean
  handleDeny: (solicitation: SolicitationDto) => void
  handleApprove: (solicitation: SolicitationDto) => void
}

export const PaidOvertimeSolicitationsAccordion = ({
  userRole,
  solicitations,
  isLoading,
  isResolvingSolicitation,
  handleDeny,
  handleApprove,
}: Props) => {
  const { formatDate } = useDatetime()
  if (isLoading) {
    return (
      <div className='flex items-center justify-center h-64'>
        <Spinner color='primary' />
      </div>
    )
  }

  if (!solicitations || solicitations.length === 0) {
    return (
      <div className='flex items-center justify-center h-64'>
        <span className='text-gray-500'>Nenhuma solicitação encontrada</span>
      </div>
    )
  }

  return (
    <SolicitationsAccordion.Container>
      {solicitations.map((solicitation) => {
        return (
          <SolicitationsAccordion.Item
            key={solicitation.id}
            solicitation={solicitation}
            isViewerManager
          >
            null
          </SolicitationsAccordion.Item>
        )
      })}
    </SolicitationsAccordion.Container>
  )
}

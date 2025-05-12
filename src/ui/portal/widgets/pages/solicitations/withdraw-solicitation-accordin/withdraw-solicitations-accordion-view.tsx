import type { WithdrawSolicitationDto } from '@/@core/portal/dtos'
import { today, getLocalTimeZone } from '@internationalized/date'
import { parseISO, isSameDay } from 'date-fns'
import { SolicitationsAccordion } from '../solicitations-accordion'
import { Input } from '@heroui/input'
import { DateRangeCalendar } from '@/ui/global/widgets/components/date-range-calendar'

type Props = {
  solicitations: WithdrawSolicitationDto[]
  isLoading: boolean
  onSolicitationApprove: (solicitationId: string, feedbackMessage?: string) => void
  onSolicitationDeny: (solicitationId: string, feedbackMessage?: string) => void
}

export const WithdrawSolicitationsAccordionView = ({
  solicitations,
  isLoading,
  onSolicitationApprove,
  onSolicitationDeny,
}: Props) => {
  return (
    <SolicitationsAccordion
      isLoading={isLoading}
      solicitations={solicitations}
      onSolicitationApprove={onSolicitationApprove}
      onSolicitationDeny={onSolicitationDeny}
    >
      {(solicitation) => (
        <div className='mt-6'>
          <DateRangeCalendar days={solicitation.withdrawalDays} />
        </div>
      )}
    </SolicitationsAccordion>
  )
}

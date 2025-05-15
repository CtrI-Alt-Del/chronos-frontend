import type { VacationSolicitationDto } from '@/@core/portal/dtos'
import { SolicitationsAccordion } from '../solicitations-accordion'
import { DateRangeCalendar } from '@/ui/global/widgets/components/date-range-calendar'

type Props = {
  solicitations: VacationSolicitationDto[]
  isLoading: boolean
  onSolicitationApprove: (solicitationId: string, feedbackMessage?: string) => void
  onSolicitationDeny: (solicitationId: string, feedbackMessage?: string) => void
  onSolicitationCancel: (solicitationId: string) => void
}

export const VacationSolicitationsAccordionView = ({
  solicitations,
  isLoading,
  onSolicitationApprove,
  onSolicitationDeny,
  onSolicitationCancel
}: Props) => {
  return (
    <SolicitationsAccordion
      isLoading={isLoading}
      solicitations={solicitations}
      onSolicitationApprove={onSolicitationApprove}
      onSolicitationDeny={onSolicitationDeny}
      onSolicitationCancel={onSolicitationCancel}
    >
      {(solicitation) => (
        <div className='mt-6'>
          <DateRangeCalendar days={solicitation.vacationDays} />
        </div>
      )}
    </SolicitationsAccordion>
  )
}

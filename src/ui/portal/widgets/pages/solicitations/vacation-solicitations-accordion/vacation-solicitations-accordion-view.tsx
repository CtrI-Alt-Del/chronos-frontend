import type { VacationSolicitationDto } from '@/@core/portal/dtos'
import { SolicitationsAccordion } from '../solicitations-accordion'
import { DateRangeCalendar } from '@/ui/global/widgets/components/date-range-calendar'

type Props = {
  solicitations: VacationSolicitationDto[]
  isLoading: boolean
  currentPage: number
  totalPages: number
  onSolicitationApprove: (solicitationId: string, feedbackMessage?: string) => void
  onSolicitationDeny: (solicitationId: string, feedbackMessage?: string) => void
  onSolicitationCancel: (solicitationId: string) => void
  handlePageChange: (page: number) => void
}

export const VacationSolicitationsAccordionView = ({
  solicitations,
  isLoading,
  currentPage,
  totalPages,
  onSolicitationApprove,
  onSolicitationDeny,
  onSolicitationCancel,
  handlePageChange,
}: Props) => {
  return (
    <SolicitationsAccordion
      isLoading={isLoading}
      solicitations={solicitations}
      currentPage={currentPage}
      totalPages={totalPages}
      onSolicitationApprove={onSolicitationApprove}
      onSolicitationDeny={onSolicitationDeny}
      onSolicitationCancel={onSolicitationCancel}
      handlePageChange={handlePageChange}
    >
      {(solicitation) => (
        <div className='mt-6'>
          <DateRangeCalendar
            startedAt={solicitation.startedAt}
            endedAt={solicitation.endedAt}
          />
        </div>
      )}
    </SolicitationsAccordion>
  )
}

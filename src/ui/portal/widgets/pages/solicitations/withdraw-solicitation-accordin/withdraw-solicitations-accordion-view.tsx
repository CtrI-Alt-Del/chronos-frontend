import type { WorkLeaveSolicitationDto } from '@/@core/portal/dtos'
import { today, getLocalTimeZone } from '@internationalized/date'
import { parseISO, isSameDay } from 'date-fns'
import { SolicitationsAccordion } from '../solicitations-accordion'
import { Input } from '@heroui/input'
import { DateRangeCalendar } from '@/ui/global/widgets/components/date-range-calendar'

type Props = {
  solicitations: WorkLeaveSolicitationDto[]
  isLoading: boolean
  currentPage: number
  totalPages: number
  onSolicitationApprove: (solicitationId: string, feedbackMessage?: string) => void
  onSolicitationDeny: (solicitationId: string, feedbackMessage?: string) => void
  onSolicitationCancel: (solicitationId: string) => void
  handlePageChange: (page: number) => void
}

export const WithdrawSolicitationsAccordionView = ({
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
      handlePageChange={handlePageChange}
      onSolicitationApprove={onSolicitationApprove}
      onSolicitationDeny={onSolicitationDeny}
      onSolicitationCancel={onSolicitationCancel}
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

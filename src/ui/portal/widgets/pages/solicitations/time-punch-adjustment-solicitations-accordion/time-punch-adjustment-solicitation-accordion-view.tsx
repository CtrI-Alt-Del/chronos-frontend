import type { TimePunchLogAdjustmentSolicitationDto } from '@/@core/portal/dtos'
import { today, getLocalTimeZone } from '@internationalized/date'
import { parseISO, isSameDay } from 'date-fns'
import { SolicitationsAccordion } from '../solicitations-accordion'
import { Input } from '@heroui/input'
import { DateRangeCalendar } from '@/ui/global/widgets/components/date-range-calendar'

type Props = {
  solicitations: TimePunchLogAdjustmentSolicitationDto[]
  isLoading: boolean
  currentPage: number
  totalPages: number
  handlePageChange: (page: number) => void
  onSolicitationApprove: (solicitationId: string, feedbackMessage?: string) => void
  onSolicitationDeny: (solicitationId: string, feedbackMessage?: string) => void
  onSolicitationCancel: (solicitationId: string) => void
}

export const TimePunchAdjustmentSolicitationsAccordionView = ({
  solicitations,
  isLoading,
  currentPage,
  totalPages,
  handlePageChange,
  onSolicitationApprove,
  onSolicitationDeny,
  onSolicitationCancel,
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
          <div className='flex gap-4'>
            <Input
              type='date'
              value={solicitation.date.toDateString()}
              readOnly
              label='Data'
            />
            <Input type='time' value={solicitation.time} readOnly label='Horário' />
            <Input type='text' value={solicitation.period} readOnly label='Período' />
          </div>
        </div>
      )}
    </SolicitationsAccordion>
  )
}

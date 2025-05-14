import type { DayOffSolicitationDto } from '@/@core/portal/dtos'
import { SolicitationsAccordion } from '../solicitations-accordion'
import { Input } from '@heroui/input'

type Props = {
  solicitations: DayOffSolicitationDto[]
  isLoading: boolean
  currentPage: number
  totalPages: number
  onSolicitationApprove: (solicitationId: string, feedbackMessage?: string) => void
  onSolicitationDeny: (solicitationId: string, feedbackMessage?: string) => void
  handlePageChange: (page: number) => void
}

export const DayOffSolicitationsAccordionView = ({
  solicitations,
  isLoading,
  currentPage,
  totalPages,
  onSolicitationApprove,
  onSolicitationDeny,
  handlePageChange,
}: Props) => {
  return (
    <SolicitationsAccordion
      isLoading={isLoading}
      solicitations={solicitations}
      onSolicitationApprove={onSolicitationApprove}
      onSolicitationDeny={onSolicitationDeny}
      currentPage={currentPage}
      totalPages={totalPages}
      handlePageChange={handlePageChange}
    >
      {(solicitation) => (
        <div className='mt-6'>
          <Input
            type='date'
            label='Dia de folga solicitada'
            defaultValue={solicitation.dayOff}
            readOnly
          />
        </div>
      )}
    </SolicitationsAccordion>
  )
}

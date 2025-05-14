import { Input } from '@heroui/input'

import type { ExcusedAbsenceSolicitationDto } from '@/@core/portal/dtos'
import { SolicitationsAccordion } from '../solicitations-accordion'

type Props = {
  solicitations: ExcusedAbsenceSolicitationDto[]
  isLoading: boolean
  currentPage: number
  totalPages: number
  onSolicitationApprove: (solicitationId: string, feedbackMessage?: string) => void
  onSolicitationDeny: (solicitationId: string, feedbackMessage?: string) => void
  handlePageChange: (page: number) => void
}

export const ExcusedAbsenceSolicitationsAccordionView = ({
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
            label='Dia da falta'
            defaultValue={solicitation.absenceDate}
            readOnly
          />
        </div>
      )}
    </SolicitationsAccordion>
  )
}

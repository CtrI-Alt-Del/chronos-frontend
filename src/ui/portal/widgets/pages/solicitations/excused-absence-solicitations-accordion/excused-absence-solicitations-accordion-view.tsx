import { Input } from '@heroui/input'

import type { ExcusedAbsenceSolicitationDto } from '@/@core/portal/dtos'
import { SolicitationsAccordion } from '../solicitations-accordion'

type Props = {
  solicitations: ExcusedAbsenceSolicitationDto[]
  isLoading: boolean
  onSolicitationApprove: (solicitationId: string, feedbackMessage?: string) => void
  onSolicitationDeny: (solicitationId: string, feedbackMessage?: string) => void
}

export const ExcusedAbsenceSolicitationsAccordionView = ({
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

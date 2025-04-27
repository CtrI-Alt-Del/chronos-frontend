import type { PaidOvertimeSolicitationDto } from '@/@core/portal/dtos'
import { SolicitationsAccordion } from '../solicitations-accordion'

type Props = {
  solicitations: PaidOvertimeSolicitationDto[]
  isLoading: boolean
  onSolicitationDeny: (feedbackMessage?: string) => void
  onSolicitationApprove: (feedbackMessage?: string) => void
}

export const DayOffSolicitationsAccordionView = ({
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
      {() => <div className='mt-6'></div>}
    </SolicitationsAccordion>
  )
}

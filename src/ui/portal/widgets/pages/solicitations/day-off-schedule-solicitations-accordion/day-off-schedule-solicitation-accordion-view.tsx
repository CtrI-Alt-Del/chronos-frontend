import type { DayOffScheduleAdjustmentSolicitationDto } from '@/@core/portal/dtos'
import { SolicitationsAccordion } from '../solicitations-accordion'
import { Input } from '@heroui/input'

type SolicitationAccordionProps = {
  solicitations: DayOffScheduleAdjustmentSolicitationDto[]
  isLoading: boolean
  onSolicitationApprove: (
    solicitationId: string,
    feedbackMessage?: string,
    collaboratorId?: string,
  ) => void
  onSolicitationDeny: (solicitationId: string, feedbackMessage?: string) => void
  onSolicitationCancel: (solicitationId: string) => void
}

export const DayOffScheduleSolicitationAccordionView = ({
  solicitations,
  isLoading,
  onSolicitationApprove,
  onSolicitationDeny,
  onSolicitationCancel,
}: SolicitationAccordionProps) => {
  return (
    <SolicitationsAccordion
      isLoading={isLoading}
      onSolicitationDeny={onSolicitationDeny}
      onSolicitationApprove={onSolicitationApprove}
      onSolicitationCancel={onSolicitationCancel}
      solicitations={solicitations}
    >
      {(solicitation) => (
        <div>
          <Input
            type='date'
            label='Nova escala'
            defaultValue={solicitation.dayOffSchedule.daysOffCount as unknown as string}
            readOnly
          />
        </div>
      )}
    </SolicitationsAccordion>
  )
}

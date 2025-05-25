import { Input } from '@heroui/input'

import type { DayOffScheduleAdjustmentSolicitationDto } from '@/@core/portal/dtos'
import { SolicitationsAccordion } from '../solicitations-accordion'

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
  currentPage: number
  totalPages: number
  handlePageChange: (page: number) => void
}

export const DayOffScheduleSolicitationAccordionView = ({
  solicitations,
  isLoading,
  onSolicitationApprove,
  onSolicitationDeny,
  onSolicitationCancel,
  currentPage,
  totalPages,
  handlePageChange,
}: SolicitationAccordionProps) => {
  return (
    <SolicitationsAccordion
      isLoading={isLoading}
      solicitations={solicitations}
      currentPage={currentPage}
      totalPages={totalPages}
      handlePageChange={handlePageChange}
      onSolicitationDeny={onSolicitationDeny}
      onSolicitationApprove={onSolicitationApprove}
      onSolicitationCancel={onSolicitationCancel}
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

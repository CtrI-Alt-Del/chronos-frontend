import type { PaidOvertimeSolicitationDto } from '@/@core/portal/dtos'
import { SolicitationsAccordion } from '../solicitations-accordion'

type Props = {
  solicitations: PaidOvertimeSolicitationDto[]
  isLoading: boolean
  currentPage: number
  totalPages: number
  onSolicitationApprove: (solicitationId: string, feedbackMessage?: string) => void
  onSolicitationDeny: (solicitationId: string, feedbackMessage?: string) => void
  handlePageChange: (page: number) => void
}

export const PaidOvertimeSolicitationsAccordionView = ({
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
      {() => (
        <div className='mt-6'>
          <p className='text-md text-slate-500'>
            ☝🏻Débito de <strong className='text-primary'>2 horas</strong> no banco de
            horas se aprovada.
          </p>
        </div>
      )}
    </SolicitationsAccordion>
  )
}

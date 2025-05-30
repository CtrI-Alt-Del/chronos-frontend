'use client'

import { useRest } from '@/ui/global/hooks/use-rest'
import { useVacationSolicitationsAccordion } from './use-vacation-solicitations-accordion'
import { VacationSolicitationsAccordionView } from './vacation-solicitations-accordion-view'

export const VacationSolicitationsAccordion = () => {
  const { portalService } = useRest()
  const {
    solicitations,
    isFetchingSolicitations,
    currentPage,
    totalPages,
    handleSolicitationApprove,
    handleSolicitationDeny,
    handleSolicitationCancel,
    handlePageChange,
  } = useVacationSolicitationsAccordion(portalService)

  return (
    <VacationSolicitationsAccordionView
      solicitations={solicitations}
      isLoading={isFetchingSolicitations}
      onSolicitationApprove={handleSolicitationApprove}
      onSolicitationDeny={handleSolicitationDeny}
      onSolicitationCancel={handleSolicitationCancel}
      currentPage={currentPage}
      totalPages={totalPages}
      handlePageChange={handlePageChange}
    />
  )
}

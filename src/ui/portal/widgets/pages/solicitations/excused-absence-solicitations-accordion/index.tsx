'use client'

import { useRest } from '@/ui/global/hooks/use-rest'
import { ExcusedAbsenceSolicitationsAccordionView } from './excused-absence-solicitations-accordion-view'
import { useExcusedAbsenceSolicitationsAccordion } from './use-excused-absence-solicitations-accordion'

export const ExcusedAbsenceSolicitationsAccordion = () => {
  const { portalService } = useRest()
  const {
    solicitations,
    isFetchingSolicitations,
    currentPage,
    totalPages,
    handleSolicitationApprove,
    handleSolicitationDeny,
    onPageChange,
  } = useExcusedAbsenceSolicitationsAccordion(portalService)

  return (
    <ExcusedAbsenceSolicitationsAccordionView
      solicitations={solicitations}
      isLoading={isFetchingSolicitations}
      currentPage={currentPage}
      totalPages={totalPages}
      onSolicitationApprove={handleSolicitationApprove}
      onSolicitationDeny={handleSolicitationDeny}
      handlePageChange={onPageChange}
    />
  )
}

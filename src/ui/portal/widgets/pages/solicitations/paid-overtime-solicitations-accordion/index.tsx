'use client'

import { useRest } from '@/ui/global/hooks/use-rest'
import { PaidOvertimeSolicitationsAccordionView } from './paid-overtime-solicitations-accordion-view'
import { usePaidOvertimeSolicitationsAccordion } from './use-paid-overtime-solicitations-accordion'

export const PaidOvertimeSolicitationsAccordion = () => {
  const { portalService } = useRest()
  const {
    solicitations,
    isFetchingSolicitations,
    currentPage,
    totalPages,
    handleSolicitationApprove,
    handleSolicitationDeny,
    handlePageChange,
    handleSolicitationCancel,
  } = usePaidOvertimeSolicitationsAccordion(portalService)

  return (
    <PaidOvertimeSolicitationsAccordionView
      solicitations={solicitations}
      isLoading={isFetchingSolicitations}
      currentPage={currentPage}
      totalPages={totalPages}
      onSolicitationApprove={handleSolicitationApprove}
      onSolicitationDeny={handleSolicitationDeny}
      onSolicitationCancel={handleSolicitationCancel}
      handlePageChange={handlePageChange}
    />
  )
}

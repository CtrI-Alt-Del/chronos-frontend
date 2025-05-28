'use client'

import { useRest } from '@/ui/global/hooks/use-rest'
import { TimePunchAdjustmentSolicitationsAccordionView } from './time-punch-adjustment-solicitation-accordion-view'
import { useTimePunchAdjustmentSolicitationsAccordion } from './use-time-punch-adjustment-solicitations-accordion'

export const TimePunchAdjustmentSolicitationsAccordion = () => {
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
  } = useTimePunchAdjustmentSolicitationsAccordion(portalService)

  return (
    <TimePunchAdjustmentSolicitationsAccordionView
      solicitations={solicitations}
      isLoading={isFetchingSolicitations}
      currentPage={currentPage}
      totalPages={totalPages}
      handlePageChange={handlePageChange}
      onSolicitationApprove={handleSolicitationApprove}
      onSolicitationDeny={handleSolicitationDeny}
      onSolicitationCancel={handleSolicitationCancel}
    />
  )
}

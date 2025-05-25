'use client'

import { useRest } from '@/ui/global/hooks/use-rest'
import { DayOffSolicitationsAccordionView } from './day-off-solicitations-accordion-view'
import { useDayOffSolicitationsAccordion } from './use-day-off-solicitations-accordion'

export const DayOffSolicitationsAccordion = () => {
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
  } = useDayOffSolicitationsAccordion(portalService)

  return (
    <DayOffSolicitationsAccordionView
      solicitations={solicitations}
      isLoading={isFetchingSolicitations}
      currentPage={currentPage}
      totalPages={totalPages}
      onSolicitationApprove={handleSolicitationApprove}
      onSolicitationDeny={handleSolicitationDeny}
      handlePageChange={handlePageChange}
      onSolicitationCancel={handleSolicitationCancel}
    />
  )
}

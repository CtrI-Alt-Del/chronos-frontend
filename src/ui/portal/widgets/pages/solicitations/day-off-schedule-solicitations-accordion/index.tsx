'use client'
import { useRest } from '@/ui/global/hooks/use-rest'
import { useDayOffScheduleAdjustmentSolicitationAccordn } from './use-day-off-schedule-adjustment-solicitation-accordin'
import { DayOffScheduleSolicitationAccordionView } from './day-off-schedule-solicitation-accordion-view'

export const DayOffScheduleAdjustmentSolicitationsAccordion = () => {
  const { portalService } = useRest()
  const {
    solicitations,
    isFetchingSolicitations,
    handleSolicitationApprove,
    handleSolicitationDeny,
    handleSolicitationCancel,
  } = useDayOffScheduleAdjustmentSolicitationAccordn(portalService)
  return (
    <DayOffScheduleSolicitationAccordionView
      solicitations={solicitations}
      isLoading={isFetchingSolicitations}
      onSolicitationApprove={handleSolicitationApprove}
      onSolicitationDeny={handleSolicitationDeny}
      onSolicitationCancel={handleSolicitationCancel}
    />
  )
}

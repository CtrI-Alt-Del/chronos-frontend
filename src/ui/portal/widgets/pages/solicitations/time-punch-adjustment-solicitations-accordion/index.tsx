'use client'

import { useRest } from '@/ui/global/hooks/use-rest'
import { TimePunchAdjustmentSolicitationsAccordionView } from './time-punch-adjustment-solicitation-accordion-view'
import { useTimePunchAdjustmentSolicitationsAccordion } from './use-time-punch-adjustment-solicitations-accordion'

export const TimePunchAdjustmentSolicitationsAccordion = () => {
  const { portalService } = useRest()
  const {
    solicitations,
    isFetchingSolicitations,
    handleSolicitationApprove,
    handleSolicitationDeny
  } = useTimePunchAdjustmentSolicitationsAccordion(portalService)

  return (
    <TimePunchAdjustmentSolicitationsAccordionView
      solicitations={solicitations}
      isLoading={isFetchingSolicitations}
      onSolicitationApprove={handleSolicitationApprove}
      onSolicitationDeny={handleSolicitationDeny}
    />
  )
}

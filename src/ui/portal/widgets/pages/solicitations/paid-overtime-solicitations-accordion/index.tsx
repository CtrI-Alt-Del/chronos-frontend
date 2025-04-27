'use client'

import { useRest } from '@/ui/global/hooks/use-rest'
import { PaidOvertimeSolicitationsAccordionView } from './paid-overtime-solicitations-accordion-view'
import { usePaidOvertimeSolicitationsAccordion } from './use-paid-overtime-solicitations-accordion'

export const PaidOvertimeSolicitationsAccordion = () => {
  const { portalService } = useRest()
  const {
    solicitations,
    isFetchingSolicitations,
    handleSolicitationApprove,
    handleSolicitationDeny,
  } = usePaidOvertimeSolicitationsAccordion(portalService)

  return (
    <PaidOvertimeSolicitationsAccordionView
      solicitations={solicitations}
      isLoading={isFetchingSolicitations}
      onSolicitationApprove={handleSolicitationApprove}
      onSolicitationDeny={handleSolicitationDeny}
    />
  )
}

'use client'

import { useRest } from '@/ui/global/hooks/use-rest'
import { WithdrawSolicitationsAccordionView } from './withdraw-solicitations-accordion-view'
import { useWithdrawSolicitationsAccordion } from './use-withdraw-solicitations-accordion'

export const WithdrawSolicitationsAccordion = () => {
  const { portalService } = useRest()
  const {
    solicitations,
    isFetchingSolicitations,
    handleSolicitationApprove,
    handleSolicitationDeny,
  } = useWithdrawSolicitationsAccordion(portalService)

  return (
    <WithdrawSolicitationsAccordionView
      solicitations={solicitations}
      isLoading={isFetchingSolicitations}
      onSolicitationApprove={handleSolicitationApprove}
      onSolicitationDeny={handleSolicitationDeny}
    />
  )
}

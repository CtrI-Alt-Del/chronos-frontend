'use client'

import type {
  SolicitationDto,
  TimePunchLogAdjustmentSolicitationDto,
} from '@/@core/portal/dtos'
import {
  TimePunchAdjustmentSolicitationAccordionView
} from './time-punch-adjustment-solicitation-accordion-view'

type SolicitationAccordionProps = {
  solicitations: TimePunchLogAdjustmentSolicitationDto[] | null
  isLoading: boolean
  userRole: string
  isResolvingSolicitation: boolean
  handleDeny: (solicitation: SolicitationDto) => void
  handleApprove: (solicitation: SolicitationDto) => void
}

export const TimePunchAdjustmentSolicitationAccordion = ({
  userRole,
  solicitations,
  isLoading,
  isResolvingSolicitation,
  handleDeny,
  handleApprove,
}: SolicitationAccordionProps) => {
  return (
    <TimePunchAdjustmentSolicitationAccordionView
      userRole={userRole}
      solicitations={solicitations}
      isLoading={isLoading}
      isResolvingSolicitation={isResolvingSolicitation}
      handleDeny={handleDeny}
      handleApprove={handleApprove}
    />
  )
}

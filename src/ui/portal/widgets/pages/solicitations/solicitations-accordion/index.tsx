'use client'

import type { ReactNode } from 'react'

import type { SolicitationDto } from '@/@core/portal/dtos'
import { SolicitationsAccordionView } from './solicitations-accordion-view'
import { useAuthContext } from '@/ui/auth/hooks/use-auth-context'

type Props = {
  solicitations: SolicitationDto[]
  isLoading: boolean
  children: (solicitation: SolicitationDto) => ReactNode
  onSolicitationApprove: (solicitationId: string, feedbackMessage?: string) => void
  onSolicitationDeny: (solicitationId: string, feedbackMessage?: string) => void
}

export const SolicitationsAccordion = (props: Props) => {
  const { isManager } = useAuthContext()
  return <SolicitationsAccordionView isViewerManager={isManager} {...props} />
}

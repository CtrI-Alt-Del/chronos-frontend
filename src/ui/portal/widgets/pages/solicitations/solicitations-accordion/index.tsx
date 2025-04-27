'use client'

import type { ReactNode } from 'react'

import type { SolicitationDto } from '@/@core/portal/dtos'
import { SolicitationsAccordionView } from './solicitations-accordion-view'
import { useAuthContext } from '@/ui/auth/hooks/use-auth-context'

type Props = {
  solicitations: SolicitationDto[]
  isLoading: boolean
  children: (solicitation: SolicitationDto) => ReactNode
  onSolicitationApprove: (feedbackMessage?: string) => void
  onSolicitationDeny: (feedbackMessage?: string) => void
}

export const SolicitationsAccordion = (props: Props) => {
  const { isManager } = useAuthContext()
  return <SolicitationsAccordionView isViewerManager={isManager} {...props} />
}

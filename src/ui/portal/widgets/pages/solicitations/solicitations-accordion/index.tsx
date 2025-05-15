'use client'

import type { ReactNode } from 'react'

import type { SolicitationDto } from '@/@core/portal/dtos'
import { SolicitationsAccordionView } from './solicitations-accordion-view'
import { useAuthContext } from '@/ui/auth/hooks/use-auth-context'

type Props<Solicitation extends SolicitationDto> = {
  solicitations: Solicitation[]
  isLoading: boolean
  currentPage: number
  totalPages: number
  handlePageChange: (page: number) => void
  children: (solicitation: Solicitation) => ReactNode
  onSolicitationApprove: (
    solicitationId: string,
    feedbackMessage?: string,
    collaboratorId?: string,
  ) => void
  onSolicitationDeny: (solicitationId: string, feedbackMessage?: string) => void
  onSolicitationCancel: (solicitationId: string) => void
}

export const SolicitationsAccordion = <Solicitation extends SolicitationDto>(
  props: Props<Solicitation>,
) => {
  const { isManager, account } = useAuthContext()
  return (
    <SolicitationsAccordionView
      isViewerManager={isManager}
      currentUserId={account?.collaboratorId as string}
      {...props}
    />
  )
}

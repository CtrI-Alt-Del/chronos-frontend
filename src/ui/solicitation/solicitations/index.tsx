'use client'
import { Button } from '@heroui/button'
import { DateRangePicker } from '@heroui/date-picker'
import Link from 'next/link'

import { SolicitationAccordion } from './solicitation-accordion'
import { useSolicitationPage } from './use-solicitation-page'
import { useAuthContext } from '@/ui/auth/hooks/use-auth-context'
import { JustificationModal } from '@/ui/global/widgets/components/justification-modal'
import { Role } from '@/@core/auth/types/role'
import { WorkdayLogDto } from '@/@core/work-schedule/dtos'
type SolcitationPageProps = {
  userRole: string
  workdayLog: WorkdayLogDto
}
export const SolicitationsPage = ({ userRole,workdayLog }: SolcitationPageProps) => {
  const {
    solicitations,
    isLoading,
    refetch,
    handleApproveSolicitation,
    handleDenySolicitation,
    isResolvingSolicitation
  } = useSolicitationPage()
  return (
    <div>
      <div className='flex px-4 md:px-10 pt-8 pb-2 justify-between md:flex items-end gap-4'>
        <div className='flex'>
          <JustificationModal onSubmit={refetch} workdayLogId={workdayLog.id as string} />
        </div>
      </div>
      <div className='px-10 py-4'>
        <SolicitationAccordion
          isResolvingSolicitation={isResolvingSolicitation}
          solicitations={solicitations}
          isLoading={isLoading}
          userRole={userRole}
          handleApprove={handleApproveSolicitation}
          handleDeny={handleDenySolicitation}
        />
      </div>
    </div>
  )
}

'use client'

import { SolicitationAccordion } from './solicitation-accordion'
import { useSolicitationPage } from './use-solicitation-page'
import { JustificationModal } from '@/ui/global/widgets/components/justification-modal'
import type { WorkdayLogDto } from '@/@core/work-schedule/dtos'

type SolcitationPageProps = {
  userRole: string
  workdayLogId: string
}
export const SolicitationsPage = ({ userRole, workdayLogId }: SolcitationPageProps) => {
  const {
    solicitations,
    isLoading,
    isResolvingSolicitation,
    refetch,
    handleApproveSolicitation,
    handleDenySolicitation,
  } = useSolicitationPage()
  return (
    <div className='w-[calc(100vw-50px)] md:w-full p-5 md:p-10'>
      <div className='flex'>
          <JustificationModal onSubmit={refetch} workdayLogId={workdayLogId} />
      </div>
      <div className='mt-10'>
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

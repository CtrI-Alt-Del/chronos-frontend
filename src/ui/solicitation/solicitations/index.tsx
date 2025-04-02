'use client'

import { SolicitationAccordion } from './solicitation-accordion'
import { useSolicitationPage } from './use-solicitation-page'
import { JustificationModal } from '@/ui/global/widgets/components/justification-modal'

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
    <div>
      <div className='flex px-4 md:px-10 pt-8 pb-2 justify-between md:flex items-end gap-4'>
        <div className='flex'>
          <JustificationModal onSubmit={refetch} workdayLogId={workdayLogId} />
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

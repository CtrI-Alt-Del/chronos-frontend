'use client'

import { DateRangeInput } from '@/ui/global/widgets/components/date-range-input'
import { useRest } from '@/ui/global/hooks/use-rest'
import { useAuthContext } from '@/ui/auth/hooks/use-auth-context'
import { TimePunchAdjustmentModal } from './time-punch-solicitation-adjustment-modal'
import { useCollaboratorHistoryPage } from './use-collaborator-history-page'
import { CollaboratorHistoryTable } from './collaborator-history-table'

export const CollaboratorHistoryPage = () => {
  const { account } = useAuthContext()
  const { workScheduleService } = useRest()
  const {
    workdayLogs,
    startDate,
    endDate,
    page,
    pagesCount,
    isLoading,
    handleStartDateChange,
    handleEndDateChange,
    handlePageChange,
    handleTimeLogChange,
  } = useCollaboratorHistoryPage(workScheduleService, account?.collaboratorId)

  return (
    <div className=''>
      <div className='flex justify-between items-center py-4'>
        <div className='flex items-center gap-2 w-full'>
          <DateRangeInput
            defeaultStartDate={startDate}
            defeaultEndDate={endDate}
            onStartDateChange={handleStartDateChange}
            onEndDateChange={handleEndDateChange}
          />
        </div>
        <TimePunchAdjustmentModal />
      </div>
      <CollaboratorHistoryTable
        workdayLogs={workdayLogs}
        page={page}
        pagesCount={pagesCount}
        isLoading={isLoading}
        onPageChange={handlePageChange}
        onTimeLogChange={handleTimeLogChange}
      />
    </div>
  )
}

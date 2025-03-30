'use client'

import { DateInput } from '@/ui/global/widgets/components/date-input'
import { useCollaboratorHistoryPage } from './use-collaborator-history-page'
import { CollaboratorHistoryTable } from './collaborator-history-table'
import { DateRangeInput } from '@/ui/global/widgets/components/date-range-input'

export const CollaboratorHistoryPage = () => {
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
  } = useCollaboratorHistoryPage()

  return (
    <div className=''>
      <div className='flex justify-between items-center py-4'>
        <div className='flex items-center gap-2 w-full'>
          <DateRangeInput
            defualtStartDate={startDate}
            defualtEndDate={endDate}
            onStartDateChange={handleStartDateChange}
            onEndDateChange={handleEndDateChange}
          />
        </div>
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

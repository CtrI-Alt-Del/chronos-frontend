'use client'

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
    <div className='w-[calc(100vw-50px)] md:w-auto border-gray-border border rounded-lg p-10'>
      <div className='flex justify-between items-center'>
        <div className='flex gap-2 items-center w-full'>
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

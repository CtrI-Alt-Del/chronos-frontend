'use client'

import { Search } from '@/ui/global/widgets/components/search'
import { DateInput } from '@/ui/global/widgets/components/date-input'
import { SectorHistoryTable } from './sector-history-table'
import { useSectorHistoryPage } from './use-sector-history-page'

export const SectorHistoryPage = () => {
  const {
    workdayLogs,
    collboratorName,
    date,
    page,
    pagesCount,
    isLoading,
    handleCollaboratorNameChange,
    handleDateChange,
    handlePageChange,
    handleTimeLogChange,
  } = useSectorHistoryPage()

  return (
    <div className=''>
      <div className='flex justify-between items-center py-4'>
        <div className='flex flex-col gap-2 w-80 md:flex-row md:items-center md:w-full'>
          <Search
            value={collboratorName}
            placeholder='Pesquisar por nome de colaborador'
            onChange={handleCollaboratorNameChange}
          />
          <DateInput defualtDate={date} onChange={handleDateChange} />
        </div>
      </div>
      <SectorHistoryTable
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

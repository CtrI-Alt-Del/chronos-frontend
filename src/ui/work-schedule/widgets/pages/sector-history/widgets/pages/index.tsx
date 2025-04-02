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
    <div className='w-[calc(100vw-50px)] md:w-full border-gray-border border rounded-lg p-10'>
      <div className='flex justify-between items-center'>
        <div className='flex flex-col gap-2 w-80 md:flex-row md:items-center md:justify-start md:w-[600px]'>
          <div className='flex flex-col gap-2 w-full'>
            <label htmlFor="" className='text-lg font-bold text-blue-500'>Nome do colaborador</label>
            <Search
              value={collboratorName}
              placeholder='Pesquisar por nome de colaborador'
              onChange={handleCollaboratorNameChange}
            />
          </div>
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

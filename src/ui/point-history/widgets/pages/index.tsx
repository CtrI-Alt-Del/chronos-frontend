'use client'
import { useUrlParamString } from '@/ui/global/hooks'
import { PointHistoryTable } from './point-history-table'
import { Search } from '@/ui/global/widgets/components/search'

export const PointHistoryPage = () => {
  const [nameSearchvalue, setNameSearchValue] = useUrlParamString('name')
  function handleNameSearchChange(name: string) {
    setNameSearchValue(name)
  }
  return (
    <div className=''>
      <div className='flex justify-between items-center py-4'>
        <div className='flex-1 w-full max-w-96 space-y-2'>
          <Search value={nameSearchvalue} onSearchChange={handleNameSearchChange} />
        </div>
      </div>
      <PointHistoryTable />
    </div>
  )
}

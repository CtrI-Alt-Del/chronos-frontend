'use client'

import { useUrlParamString } from '@/ui/global/hooks'
import { Search } from '@/ui/global/widgets/components/commons/search'

import { PointHistoryTable } from './point-history-table'
import { JustificationModal } from './justification-modal'

export const PointHistoryPage = () => {
  const [nameSearchvalue, setNameSearchValue] = useUrlParamString('name')
  function handleNameSearchChange(name: string) {
    setNameSearchValue(name)
  }

  return (
    <div>
      <div className="flex justify-between items-center pl-4 pr-10 py-4">
        <div className='flex-1 space-y-2'>
          <Search value={nameSearchvalue} onSearchChange={handleNameSearchChange} />
        </div>
        <div>
          <JustificationModal />
        </div>
      </div>
      <PointHistoryTable />
    </div>
  )
}

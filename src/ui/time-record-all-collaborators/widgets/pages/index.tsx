'use client';
import { useUrlParamString } from '@/ui/global/hooks';
import { TimeRecordAllCollaboratorsTable } from './time-record-all-collaborators-table';
import { Search } from '@/ui/global/widgets/components/commons/search';

export const TimeRecordAllCollaboratorsPage = () => {
  const [nameSearchvalue,setNameSearchValue] = useUrlParamString('name')
  function handleNameSearchChange(name:string){
    setNameSearchValue(name)
  }

  return (
    <div className="">
      <div className="flex justify-between items-center py-4">
        <div className='flex-1 w-full max-w-96 space-y-2'>
          <Search value={nameSearchvalue} onSearchChange={handleNameSearchChange}/>
        </div>
      </div>
      <TimeRecordAllCollaboratorsTable/>
    </div>
  );
};
// 'use client'
// import { Button } from '@heroui/button'
// import { useDisclosure } from '@heroui/react'
// import { useUrlParamString } from '@/ui/global/hooks'
// import { Search } from '@/ui/global/widgets/components/commons/search'

// import { PointHistoryTable } from './point-history-table'
// import { JustificationModal } from '../../../work-schedule/widgets/pages/sector-history/collaborator-history/justification-modal'

// export const PointHistoryPage = () => {
//   const { isOpen, onOpen, onOpenChange } = useDisclosure()
//   const [nameSearchvalue, setNameSearchValue] = useUrlParamString('name')
//   function handleNameSearchChange(name: string) {
//     setNameSearchValue(name)
//   }

//   return (
//     <div>
//       <div className='flex justify-between items-center pl-4 pr-10 py-4'>
//         <div className='flex-1 space-y-2'>
//           <Search value={nameSearchvalue} onSearchChange={handleNameSearchChange} />
//         </div>
//         <div>
//           <Button onPress={onOpen} color='primary'>
//             Justificar Falta
//           </Button>
//           <JustificationModal isOpen={isOpen} onOpenChange={onOpenChange} />
//         </div>
//       </div>
//       <PointHistoryTable />
//     </div>
//   )
// }

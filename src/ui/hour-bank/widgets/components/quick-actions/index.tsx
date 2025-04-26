'use client'

import { Palmtree } from 'lucide-react'
import { JustificationModal } from '@/ui/global/widgets/components/justification-modal'
import { DayOffSolicitationDialog } from './day-off-solicitation-dialog'
import { OvertimeSolicitationDialog } from './overtime-solicitation-dialog'

export function QuickActions() {
  return (
    <div className='flex flex-col'>
      <p className='text-2xl font-semibold text-black'>Ações rápidas</p>
      <p className='mt-1 text-sm font-normal text-gray-400'>
        Gerencie seu tempo de trabalho
      </p>
      <div className='grid grid-cols-1 gap-4 mt-4 md:grid-cols-3'>
        <OvertimeSolicitationDialog />
        
        <DayOffSolicitationDialog />
      </div>
    </div>
  )
} 

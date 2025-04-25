'use client'

import Link from 'next/link'
import { Palmtree, Clock } from 'lucide-react'
import { JustificationModal } from '@/ui/global/widgets/components/justification-modal'
import { DayOffSolicitationDialog } from './day-off-solicitation-dialog'

export function QuickActions() {
  return (
    <div className='flex flex-col'>
      <p className='text-2xl font-semibold text-black'>Ações rápidas</p>
      <p className='mt-1 text-sm font-normal text-gray-400'>
        Gerencie seu tempo de trabalho
      </p>
      <div className='grid grid-cols-1 gap-4 mt-4 md:grid-cols-3'>
        <Link
          href="#"
          className='flex gap-4 items-center p-4 bg-white rounded-lg border border-[#D5E7FF] hover:shadow-md hover:border-blue-300 hover:bg-blue-50 transition-all duration-300'
        >
          <div className='p-3 rounded-lg bg-[#9B7B29]'>
            <Clock className='w-6 h-6 text-[#FFC300]' />
          </div>
          <div>
            <h3 className='font-medium'>Solicitar Hora Extra</h3>
            <p className='text-sm text-gray-500'>Trabalho adicional</p>
          </div>
        </Link>
        
        <DayOffSolicitationDialog />
      </div>
    </div>
  )
} 

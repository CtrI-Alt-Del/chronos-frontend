import Link from 'next/link'
import { DayOffSolicitationDialog } from './day-off-solicitation-dialog'
import { Icon } from '@/ui/global/widgets/components/Icon'

type QuickActionsViewProps = {
  isCollaboratorItself: boolean
}

export const QuickActionsView = ({ isCollaboratorItself }: QuickActionsViewProps) => {
  if (!isCollaboratorItself)
    return (
      <div>
        <p className='text-xl font-semibold text-black'>Ações rápidas</p>
        <p className='mt-1 text-sm font-normal text-gray-400'>
          Gerencie seu tempo de trabalho
        </p>
        <div className='flex gap-3 mt-3 w-full'>
          <Link
            href='#'
            className='flex gap-4 items-center p-4 w-full bg-white rounded-lg border border-[#D5E7FF] hover:shadow-md hover:border-blue-300 hover:bg-blue-50 transition-all duration-300'
          >
            <div className='p-3 rounded-lg bg-[#9B7B29]'>
              <Icon name='clock' className='w-6 h-6 text-[#FFC300]' />
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

import { DayOffSolicitationDialog } from './day-off-solicitation-dialog'
import { PaidOvertimeDialog } from './paid-overtime-dialog'

type QuickActionsViewProps = {
  isCollaboratorItself: boolean
  workload: number
}

export const QuickActionsView = ({
  isCollaboratorItself,
  workload,
}: QuickActionsViewProps) => {
  if (isCollaboratorItself)
    return (
      <div>
        <p className='text-xl font-semibold text-black'>Ações rápidas</p>
        <p className='mt-1 text-sm font-normal text-gray-400'>
          Gerencie seu tempo de trabalho
        </p>
        <div className='flex gap-3 mt-3 w-full'>
          <PaidOvertimeDialog />
          <DayOffSolicitationDialog workload={workload} />
        </div>
      </div>
    )
}

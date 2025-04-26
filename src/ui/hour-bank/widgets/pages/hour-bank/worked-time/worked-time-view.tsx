import type { WorkTimeDto } from '@/@core/work-schedule/dtos'
import { Time } from '@/ui/work-schedule/widgets/components/time'

type WorkedTimeViewProps = {
  workTime: WorkTimeDto
}

export const WorkedTimeView = ({ workTime }: WorkedTimeViewProps) => {
  return (
    <div className='flex gap-3'>
      <div className='flex-col flex-1 items-start p-3 bg-blue-50 rounded-2xl border border-[#D5E7FF]'>
        <p className='text-gray-500 text-sm'>Horas trabalhadas hoje</p>
        <Time className='text-2xl font-semibold'>{workTime.workdayTime}</Time>
      </div>
      <div className='flex-col flex-1 items-start p-3 bg-blue-50 rounded-2xl border border-[#D5E7FF]'>
        <p className='text-gray-500 text-sm'>Total de horas trabalhadas no mes</p>
        <Time className='text-2xl font-semibold'>{workTime.workMonthTime}</Time>
      </div>
    </div>
  )
}

import { Card, CardHeader } from '@heroui/card'
import Link from 'next/link'

import type { WorkScheduleDto } from '@/@core/work-schedule/dtos'
import { Icon } from '@/ui/global/widgets/components/Icon'
import { ROUTES } from '@/constants'

type WorkScheduleCardProps = {
  schedule: WorkScheduleDto
}

export const WorkScheduleCard = ({ schedule }: WorkScheduleCardProps) => {
  return (
    <Link href={ROUTES.workSchedule.schedule(schedule.id)} className='focus:outline-none'>
      <Card
        className='w-64 border hover:bg-gray-100 transition-all cursor-pointer'
        shadow='none'
      >
        <CardHeader className='flex gap-3'>
          <div className='rounded-md p-2 border border-slate-300 bg-slate-50'>
            <Icon name='schedule' size={32} />
          </div>
          <div className='flex flex-col'>
            <p className='text-sm text-slate-700 font-semibold'>{schedule.description}</p>
          </div>
        </CardHeader>
      </Card>
    </Link>
  )
}

import { cn } from '@heroui/theme'

import { Icon } from '@/ui/global/widgets/components/Icon'
import { Time } from '../../time'

type TimeLogProps = {
  time: string | null
}

export const TimeLog = ({ time }: TimeLogProps) => {
  return (
    <div className='flex items-center gap-2 text-md'>
      <Icon
        name='clock'
        size={18}
        className={cn(time !== null ? 'text-primary' : 'text-slate-500')}
      />
      <Time>{time}</Time>
    </div>
  )
}

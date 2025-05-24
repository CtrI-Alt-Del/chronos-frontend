import { Chip, Tooltip } from '@heroui/react'
import { cn } from '@heroui/theme'

import { FormattedDate } from '@/ui/global/widgets/components/formatted-date'

type Props = {
  description: string
  startedAt: Date
  endedAt: Date
  isVacation: boolean
  daysCount: number
}

export const WorkLeaveView = ({
  description,
  startedAt,
  endedAt,
  isVacation,
  daysCount,
}: Props) => {
  return (
    <Tooltip
      showArrow
      content={
        <div className='px-1 py-2 w-52'>
          <div className='text-small font-bold'>{description}</div>
          <hr className='my-2' />
          <div className='space-y-2'>
            <div className='grid grid-cols-2 justify-items-end items-center text-sm'>
              <Chip className='bg-zinc-100 rounded-md px-0 py-1 text-sm w-full'>
                Data inicial:
              </Chip>
              <FormattedDate date={startedAt} />
            </div>
            <div className='grid grid-cols-2 justify-items-end items-center text-sm'>
              <Chip className='bg-zinc-100 rounded-md px-0 py-1 text-sm'>
                Data final:
              </Chip>
              <FormattedDate date={endedAt} />
            </div>
            <div className='grid grid-cols-2 justify-items-end items-center text-sm'>
              <Chip className='bg-zinc-100 rounded-md px-0 py-1 text-sm'>
                Qtd. de dias:
              </Chip>
              <span className='mr-auto ml-4'>{daysCount}</span>
            </div>
          </div>
        </div>
      }
    >
      <div
        className={cn(
          'absolute z-50 -translate-y-4 top-0 flex items-center h-8 px-2 text-gray-100 hover:opacity-80',
          isVacation ? 'bg-[#186BD9]' : 'bg-[#ff355e]',
        )}
        style={{
          width: `${(daysCount + 1) * 41}px`,
        }}
      >
        <div>{description}</div>
      </div>
    </Tooltip>
  )
}

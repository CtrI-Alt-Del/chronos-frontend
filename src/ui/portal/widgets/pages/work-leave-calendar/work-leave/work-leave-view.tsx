import { Chip, Tooltip } from '@heroui/react'
import { cn } from '@heroui/theme'

import type { JustificationDto } from '@/@core/portal/dtos'
import { FormattedDate } from '@/ui/global/widgets/components/formatted-date'
import { JusticationViewerView } from '../../../components/justification-viewer/justification-viewer'

type Props = {
  description: string
  startedAt: Date
  endedAt: Date
  isVacation: boolean
  daysCount: number
  overlapsMonthStart: boolean
  overlapsMothEnd: boolean
  justification?: JustificationDto
}

export const WorkLeaveView = ({
  description,
  startedAt,
  endedAt,
  isVacation,
  daysCount,
  overlapsMonthStart,
  overlapsMothEnd,
  justification,
}: Props) => {
  let width = 0

  if (overlapsMonthStart) {
    width = daysCount - endedAt.getDate()
  } else if (overlapsMothEnd) {
    width = endedAt.getDate()
  } else {
    width = daysCount
  }

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

            {justification && (
              <JusticationViewerView justification={justification} isSmall />
            )}
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
          width: `${width * 41}px`,
        }}
      >
        <div>{description}</div>
      </div>
    </Tooltip>
  )
}

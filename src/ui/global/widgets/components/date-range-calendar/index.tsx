import { RangeCalendar } from '@heroui/react'
import { parseDate, type CalendarDate } from '@internationalized/date'

type Props = {
  startedAt: string
  endedAt: string
}

export const DateRangeCalendar = ({ startedAt,endedAt }: Props) => {
  const startedAtDate: CalendarDate = parseDate(startedAt)
  const endedAtDate: CalendarDate = parseDate(endedAt)

  return (
    <div className='relative'>
      <RangeCalendar
        aria-label='Dias'
        defaultValue={{
          start: startedAtDate,
          end: endedAtDate,
        }}
        isReadOnly
        className=' opacity-70'
      />
    </div>
  )
}


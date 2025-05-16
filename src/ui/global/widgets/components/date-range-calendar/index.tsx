import { RangeCalendar } from '@heroui/react'
import { parseDate, type CalendarDate } from '@internationalized/date'

type Props = {
  days: string[] 
}

export const DateRangeCalendar = ({ days }: Props) => {
  const parsedDays: CalendarDate[] = days.map((d) => parseDate(d))

  const minDate = parsedDays.reduce((a, b) => (a.compare(b) < 0 ? a : b))
  const maxDate = parsedDays.reduce((a, b) => (a.compare(b) > 0 ? a : b))

  return (
    <div className='relative'>
      <RangeCalendar
        aria-label='Dias'
        defaultValue={{
          start: minDate,
          end: maxDate,
        }}
        isReadOnly
        className=' opacity-70'
      />
    </div>
  )
}


import { useDatetime } from '@/ui/global/hooks/use-datetime'
import { CalendarRowView } from './calendar-view'

export const CalendarRow = () => {
  const {} = useDatetime()
  return <CalendarRowView />
}

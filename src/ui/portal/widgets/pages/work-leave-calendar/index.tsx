import { useRest } from '@/ui/global/hooks/use-rest'
import { useWorkLeaveCalendar } from './use-work-leave-calendar'
import { WorkLeaveCalendarPageView } from './work-leave-calendar-view'

const today = new Date()

export const WorkLeaveCalendarPage = () => {
  const { portalService } = useRest()
  const { workLeaveCalendar, isLoading, month, year, handleDateInputChange } =
    useWorkLeaveCalendar(portalService, today)

  return (
    <WorkLeaveCalendarPageView
      workLeaveCalendar={workLeaveCalendar}
      month={month}
      year={year}
      handleDateInputChange={handleDateInputChange}
    />
  )
}

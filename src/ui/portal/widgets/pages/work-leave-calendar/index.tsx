'use client'

import { useRest } from '@/ui/global/hooks/use-rest'
import { useWorkLeaveCalendar } from './use-work-leave-calendar'
import { WorkLeaveCalendarPageView } from './work-leave-calendar-view'
import { useDatetime } from '@/ui/global/hooks/use-datetime'

const today = new Date()

export const WorkLeaveCalendarPage = () => {
  const { portalService } = useRest()
  const {
    collaboratorWorkLeaves,
    isLoading,
    month,
    year,
    page,
    itemsCount,
    handleDateInputChange,
    handlePageChange,
    handleCollaboratorNameChange,
  } = useWorkLeaveCalendar(portalService, today)
  const { getMonthDaysOf } = useDatetime()
  const monthDays = getMonthDaysOf()

  return (
    <WorkLeaveCalendarPageView
      collaboratorWorkLeaves={collaboratorWorkLeaves}
      month={month}
      year={year}
      monthDays={monthDays}
      page={page}
      itemsCount={itemsCount}
      onPageChange={handlePageChange}
      onDateInputChange={handleDateInputChange}
      onCollaboratorNameChange={handleCollaboratorNameChange}
    />
  )
}

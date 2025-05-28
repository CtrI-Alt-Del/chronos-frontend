'use client'

import { useRest } from '@/ui/global/hooks/use-rest'
import { useWorkLeaveCalendar } from './use-work-leave-calendar'
import { WorkLeaveCalendarPageView } from './work-leave-calendar-view'

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
    pagesCount,
    monthDays,
    handleDateInputChange,
    handlePageChange,
    handleCollaboratorNameChange,
  } = useWorkLeaveCalendar(portalService, today)

  return (
    <WorkLeaveCalendarPageView
      collaboratorWorkLeaves={collaboratorWorkLeaves}
      month={month}
      year={year}
      monthDays={monthDays}
      page={page}
      itemsCount={itemsCount}
      pagesCount={pagesCount}
      onPageChange={handlePageChange}
      onDateInputChange={handleDateInputChange}
      onCollaboratorNameChange={handleCollaboratorNameChange}
    />
  )
}

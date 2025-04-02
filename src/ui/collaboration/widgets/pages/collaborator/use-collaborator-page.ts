import { useEffect } from 'react'

import { useCollaboratorStore } from '@/ui/collaboration/stores/collaborator-store'
import type { Tab } from '@/ui/collaboration/stores/collaborator-store/types/tab'
import type { CollaboratorDto } from '@/@core/collaboration/dtos'
import type { DayOffScheduleDto, WeekdayScheduleDto } from '@/@core/work-schedule/dtos'

export function useCollaboratorPage(
  currentCollaborator?: CollaboratorDto,
  currentWeekSchedule?: WeekdayScheduleDto[],
  currentDayOffSchedule?: DayOffScheduleDto,
) {
  const {
    getCollaboratorSlice,
    getWeekScheduleSlice,
    getDayOffScheduleSlice,
    getTabSlice,
    resetStore,
  } = useCollaboratorStore()
  const { tab, setTab } = getTabSlice()
  const { collaborator, setCollaborator } = getCollaboratorSlice()
  const { weekSchedule, setWeekSchedule } = getWeekScheduleSlice()
  const { dayOffSchedule, setDayOffSchedule } = getDayOffScheduleSlice()

  function handleTabChange(tab: Tab) {
    setTab(tab)
  }

  useEffect(() => {
    if (currentCollaborator && !collaborator) {
      setCollaborator(currentCollaborator)
    }
  }, [currentCollaborator, collaborator, setCollaborator])

  useEffect(() => {
    if (currentWeekSchedule && !weekSchedule.length) {
      setWeekSchedule(currentWeekSchedule)
    }
  }, [currentWeekSchedule, weekSchedule, setWeekSchedule])

  useEffect(() => {
    if (currentDayOffSchedule && !dayOffSchedule) {
      setDayOffSchedule(currentDayOffSchedule)
    }
  }, [currentDayOffSchedule, dayOffSchedule, setDayOffSchedule])

  useEffect(() => {
    return () => {
      resetStore()
    }
  }, [])

  return {
    activeTab: tab,
    isWeekScheduleTabDisabled: collaborator === null,
    isDayOffScheduleTabDisabled: weekSchedule.length === 0,
    handleTabChange,
  }
}

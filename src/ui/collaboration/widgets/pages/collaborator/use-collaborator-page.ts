import { useEffect } from 'react'

import { useCollaboratorStore } from '@/ui/collaboration/stores/collaborator-store'
import type { Tab } from '@/ui/collaboration/stores/collaborator-store/types/tab'
import type { CollaboratorDto } from '@/@core/collaboration/dtos'
import type { DayOffScheduleDto } from '@/@core/work-schedule/dtos'
import { useQueryParamString } from '@/ui/global/hooks/use-query-param-string'
import { useRouter } from 'next/navigation'

export function useCollaboratorPage(
  currentCollaborator?: CollaboratorDto,
  currentDayOffSchedule?: DayOffScheduleDto,
) {
  const { useCollaboratorSlice, useDayOffScheduleSlice, useTabSlice, resetStore } =
    useCollaboratorStore()
  const { tab, setTab } = useTabSlice()
  const { collaborator, setCollaborator } = useCollaboratorSlice()
  const { dayOffSchedule, setDayOffSchedule } = useDayOffScheduleSlice()
  const [currentTab, setCurrentTab] = useQueryParamString('tab')

  function handleTabChange(tab: Tab) {
    setTab(tab)
  }

  useEffect(() => {
    if (currentCollaborator && !collaborator) {
      setCollaborator(currentCollaborator)
    }
  }, [currentCollaborator, collaborator, setCollaborator])

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
  useEffect(()=>{
    setTab(currentTab as Tab)
  },[currentTab,setTab])

  return {
    activeTab: tab,
    isDayOffScheduleTabDisabled: collaborator === null,
    handleTabChange,
  }
}

import { useEffect } from 'react'

import { useCollaboratorStore } from '@/ui/collaboration/stores/collaborator-store'
import type { Tab } from '@/ui/collaboration/stores/collaborator-store/types/tab'
import type { CollaboratorDto } from '@/@core/collaboration/dtos'

export function useCollaboratorPage(currentCollaborator?: CollaboratorDto) {
  const { getCollaboratorSlice, getWeekScheduleSlice, getTabSlice } =
    useCollaboratorStore()
  const { tab, setTab } = getTabSlice()
  const { collaborator, setCollaborator } = getCollaboratorSlice()
  const { weekSchedule } = getWeekScheduleSlice()

  function handleTabChange(tab: Tab) {
    setTab(tab)
  }

  useEffect(() => {
    if (currentCollaborator && !collaborator) {
      setCollaborator(currentCollaborator)
    }
  }, [currentCollaborator, collaborator, setCollaborator])

  return {
    activeTab: tab,
    isWeekScheduleTabDisabled: collaborator === null,
    isDayOffScheduleTabDisabled: weekSchedule.length === 0,
    handleTabChange,
  }
}

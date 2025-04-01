import { useEffect } from 'react'

import { useCollaboratorStore } from '@/ui/collaboration/stores/collaborator-store'
import type { Tab } from '@/ui/collaboration/stores/collaborator-store/types/tab'
import type { CollaboratorDto } from '@/@core/collaboration/dtos'

export function useCollaboratorPage(collaborator?: CollaboratorDto) {
  const { getCollaboratorSlice, getTabSlice } = useCollaboratorStore()
  const { tab, setTab } = getTabSlice()
  const { setCollaborator } = getCollaboratorSlice()

  function handleTabClick(tab: Tab) {
    setTab(tab)
  }

  useEffect(() => {
    if (collaborator) {
      setCollaborator(collaborator)
    }
  }, [collaborator, setCollaborator])

  return {
    activeTab: tab,
    handleTabClick,
  }
}

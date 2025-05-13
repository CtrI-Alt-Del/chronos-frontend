'use client'

import { SolicitationsPageView } from './solicitations-page-view'
import { useSolicitationsPage } from './use-solicitations-page'

export const SolicitationsPage = () => {
  const { 
    activeTab, 
    handleTabChange,
  } = useSolicitationsPage()

  return (
    <SolicitationsPageView 
      activeTab={activeTab} 
      onTabChange={handleTabChange}
    />
  )
}

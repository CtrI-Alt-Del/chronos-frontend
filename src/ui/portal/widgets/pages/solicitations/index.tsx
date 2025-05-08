'use client'

import { SolicitationsPageView } from './solicitations-page-view'
import { useSolicitationsPage } from './use-solicitations-page'

export const SolicitationsPage = () => {
  const { 
    activeTab, 
    handleTabChange,
    currentPage,
    totalPages,
    hasMorePages,
    handlePreviousPage,
    handleNextPage,
    isFetching
  } = useSolicitationsPage()

  return (
    <SolicitationsPageView 
      activeTab={activeTab} 
      onTabChange={handleTabChange}
      currentPage={currentPage}
      totalPages={totalPages}
      hasMorePages={hasMorePages}
      isFetching={isFetching}
      onPreviousPage={handlePreviousPage}
      onNextPage={handleNextPage}
    />
  )
}

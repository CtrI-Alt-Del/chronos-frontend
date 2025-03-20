import { useState } from 'react'

export function usePrivateLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  function handleSidebarClose() {
    setIsSidebarOpen(!isSidebarOpen)
  }

  function handleMenuClick() {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return {
    isSidebarOpen,
    handleMenuClick,
    handleSidebarClose,
  }
}

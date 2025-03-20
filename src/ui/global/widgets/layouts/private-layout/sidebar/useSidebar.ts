import type { KeyboardEvent } from 'react'

export function useSidebar(onClose: VoidFunction) {
  function handleExpandButtonClick(event: KeyboardEvent) {
    if (event.key === 'Enter') onClose()
  }

  return {
    handleExpandButtonClick,
  }
}

import { useAuthContext } from '@/ui/auth/hooks/use-auth-context'
import type { KeyboardEvent } from 'react'

export function useSidebar(onClose: VoidFunction) {
  const { logout } = useAuthContext()

  function handleExpandButtonClick(event: KeyboardEvent) {
    if (event.key === 'Enter') onClose()
  }

  async function handleLogoutButtonClick() {
    await logout()
  }

  return {
    handleExpandButtonClick,
    handleLogoutButtonClick,
  }
}

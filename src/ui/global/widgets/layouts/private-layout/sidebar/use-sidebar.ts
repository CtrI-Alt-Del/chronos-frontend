import type { KeyboardEvent } from 'react'

import { useAuthContext } from '@/ui/auth/hooks/use-auth-context'

export function useSidebar(onClose: VoidFunction) {
  const { account, isAdmin, isManager, isEmployee } = useAuthContext()
  const { logout } = useAuthContext()

  function handleExpandButtonClick(event: KeyboardEvent) {
    if (event.key === 'Enter') onClose()
  }

  async function handleLogoutButtonClick() {
    await logout()
  }

  return {
    isAdmin,
    isManager,
    isEmployee,
    collaboratorId: String(account?.collaboratorId),
    handleExpandButtonClick,
    handleLogoutButtonClick,
  }
}

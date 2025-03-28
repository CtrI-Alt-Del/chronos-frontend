import { useAuthContext } from '@/ui/auth/hooks/use-auth-context'
import { useDatetime } from '@/ui/global/hooks/use-datetime'
import type { KeyboardEvent } from 'react'

export function useSidebar(onClose: VoidFunction) {
  const { formatIsoDate, getCurrentDate } = useDatetime()
  const { logout } = useAuthContext()

  function handleExpandButtonClick(event: KeyboardEvent) {
    if (event.key === 'Enter') onClose()
  }

  async function handleLogoutButtonClick() {
    await logout()
  }

  return {
    queryDate: `date=${formatIsoDate(getCurrentDate())}`,
    handleExpandButtonClick,
    handleLogoutButtonClick,
  }
}

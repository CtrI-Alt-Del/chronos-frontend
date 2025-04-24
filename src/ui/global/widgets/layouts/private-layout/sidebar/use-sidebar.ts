import { useAuthContext } from '@/ui/auth/hooks/use-auth-context'
import { useDatetime } from '@/ui/global/hooks/use-datetime'
import type { KeyboardEvent } from 'react'

export function useSidebar(onClose: VoidFunction) {
  const { account, isAdmin, isManager, isEmployee } = useAuthContext()
  const { formatIsoDate, getCurrentDate, minusDays } = useDatetime()
  const { logout } = useAuthContext()
  const date = getCurrentDate()

  function handleExpandButtonClick(event: KeyboardEvent) {
    if (event.key === 'Enter') onClose()
  }

  async function handleLogoutButtonClick() {
    await logout()
  }

  return {
    queryDate: `date=${formatIsoDate(date)}`,
    queryDateRange: `startDate=${formatIsoDate(minusDays(date, 7))}&endDate=${formatIsoDate(date)}`,
    isAdmin,
    isManager,
    isEmployee,
    collaboratorId: String(account?.collaboratorId),
    handleExpandButtonClick,
    handleLogoutButtonClick,
  }
}

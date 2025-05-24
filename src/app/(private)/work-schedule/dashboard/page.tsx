import { authActions } from '@/server/next-safe-action'
import DashboardPage from '@/ui/work-schedule/widgets/pages/dashboard'

const Page = async () => {
  await authActions.allowPageForRoles(['admin', 'manager'])
  return <DashboardPage />
}

export default Page
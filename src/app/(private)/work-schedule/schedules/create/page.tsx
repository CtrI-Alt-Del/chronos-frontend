import { AuthService } from '@/api/services/auth-service'
import { authActions } from '@/server/next-safe-action'
import { SchedulePage } from '@/ui/work-schedule/widgets/pages/schedule'

const Page = async() => {
  await authActions.allowPageForRoles(["admin", "manager"])
  return <SchedulePage schedule={null} />
}

export default Page

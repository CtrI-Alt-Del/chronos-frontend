import { authActions } from '@/server/next-safe-action'
import { SchedulesPage } from '@/ui/work-schedule/widgets/pages/schedules'

const Page = async () => {
  await authActions.allowPageByRoles(['manager'])

  return <SchedulesPage />
}

export default Page

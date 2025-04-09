import { authActions } from '@/server/next-safe-action'
import { SectorHistoryPage } from '@/ui/work-schedule/widgets/pages/sector-history/widgets/pages'

const Page = async () => {
  await authActions.allowPageForRoles(["admin", "manager"])
  return <SectorHistoryPage />
}
export default Page

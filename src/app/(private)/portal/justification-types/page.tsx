import { authActions, portalActions } from '@/server/next-safe-action'
import { JustificationTypesPage } from '@/ui/portal/widgets/pages/justification-types'

const Page = async () => {
  await authActions.allowPageForRoles(['admin', 'manager'])

  const result = await portalActions.listJustificationTypes()
  if (!result?.data) return

  return <JustificationTypesPage justificationTypes={result.data} />
}

export default Page

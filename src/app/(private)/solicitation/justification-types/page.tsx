import { authActions, solicitationActions } from '@/server/next-safe-action'
import { JustificationTypesPage } from '@/ui/solicitation/justification-types'

const Page = async () => {
  await authActions.allowPageForRoles(['admin', 'manager'])

  const result = await solicitationActions.listJustificationTypes()
  if (!result?.data) return


  return <JustificationTypesPage justificationTypes={result.data} />
}

export default Page 

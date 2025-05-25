import { authActions } from '@/server/next-safe-action'
import { CollaboratorsPage } from '@/ui/collaboration/widgets/pages/collaborators'

const Page = async () => {
  await authActions.allowPageForRoles(['admin', 'manager'])
  return <CollaboratorsPage />
}

export default Page

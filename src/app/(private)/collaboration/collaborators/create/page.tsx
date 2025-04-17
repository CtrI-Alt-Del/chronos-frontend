import { authActions } from '@/server/next-safe-action'
import { CollaboratorPage } from '@/ui/collaboration/widgets/pages/collaborator'

const Page = async () => {
  await authActions.allowPageForRoles(['admin', 'manager'])
  return <CollaboratorPage />
}

export default Page

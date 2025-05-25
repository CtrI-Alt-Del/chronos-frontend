import { collaborationActions, hourBankActions } from '@/server/next-safe-action'
import { QuickActionsView } from './quick-actions-view'

type QuickActionsProps = {
  collaboratorId: string
}

export const QuickActions = async ({ collaboratorId }: QuickActionsProps) => {
  const response = await collaborationActions.getCollaboratorProfile()
  if (!response?.data?.collaborator) return
  const collaborator = response.data?.collaborator
  const isCollaboratorItself = collaborator.id === collaboratorId

  return (
    <QuickActionsView
      isCollaboratorItself={isCollaboratorItself}
      workload={collaborator.workload}
    />
  )
}

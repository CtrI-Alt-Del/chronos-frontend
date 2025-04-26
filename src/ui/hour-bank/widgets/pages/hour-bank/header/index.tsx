import { HeaderView } from './header-view'
import { collaborationActions } from '@/server/next-safe-action'

type HeaderProps = {
  collaboratorId: string
}

export const Header = async ({ collaboratorId }: HeaderProps) => {
  const response = await collaborationActions.getCollaboratorProfile()
  if (!response?.data?.collaborator) return
  const collaborator = response.data?.collaborator

  return (
    <HeaderView
      collaboratorName={collaborator.name}
      isCollaboratorItself={collaborator.id === collaboratorId}
    />
  )
}

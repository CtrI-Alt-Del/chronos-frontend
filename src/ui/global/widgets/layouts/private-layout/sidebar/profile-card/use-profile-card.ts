import { useAuthContext } from '@/ui/auth/hooks/use-auth-context'
import { useState, useEffect } from 'react'
import { collaborationActions } from '@/server/next-safe-action'

export function useProfileCard() {
  const { account } = useAuthContext()
  const [displayName, setDisplayName] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const profileResponse = await collaborationActions.getCollaboratorProfile()

        if (profileResponse?.data?.collaborator?.name) {
          setDisplayName(profileResponse.data.collaborator.name)
        } else if (account?.email) {
          setDisplayName(account.email.split('@')[0])
        } else {
          setDisplayName('Usuário')
        }
      } catch (error) {
        if (account?.email) {
          setDisplayName(account.email.split('@')[0])
        } else {
          setDisplayName('Usuário')
        }
      } finally {
        setIsLoading(false)
      }
    }

    fetchUserProfile()
  }, [account])

  return {
    displayName,
    isLoading,
  }
}

import { useAuthContext } from '@/ui/auth/hooks/use-auth-context'
import { useState, useEffect } from 'react'
import { collaborationActions } from '@/server/next-safe-action'
import { useGetCollaboratorAction } from './use-get-collaborator-profile-action'
import type { CollaboratorDto } from '@/@core/collaboration/dtos'

export function useProfileCard() {
  const [profile, setProfile] = useState<CollaboratorDto | null>()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const { getProfile } = useGetCollaboratorAction()

  useEffect(() => {
    const fetchUserProfile = async () => {
      const collaborator = await getProfile()
      if (collaborator)
        setProfile(collaborator)
    }
    fetchUserProfile()
  }, [])

  return {
    profile,
    isLoading,
  }
}

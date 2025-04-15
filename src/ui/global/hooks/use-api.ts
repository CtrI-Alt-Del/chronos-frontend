import { NextApiClient } from '@/api/next'
import { WorkScheduleService } from '@/api/services/work-schedule-service'
import { CLIENT_ENV } from '@/constants/client-env'
import { CollaborationService } from '@/api/services/collaboration-service'
import { useAuthContext } from '@/ui/auth/hooks/use-auth-context'
import { SolicitationService } from '@/api/services'
import { AuthService } from '@/api/services/auth-service'

const nextApiClient = NextApiClient({ isCacheEnabled: false })
nextApiClient.setBaseUrl(CLIENT_ENV.serverAppUrl)

export function useApi() {
  const { jwt } = useAuthContext()

  if (jwt) {
    nextApiClient.setHeader('Authorization', `Bearer ${jwt}`)
  }

  return {
    authService: AuthService(nextApiClient),
    workScheduleService: WorkScheduleService(nextApiClient),
    collaborationService: CollaborationService(nextApiClient),
    solicitationService: SolicitationService(nextApiClient)
  }
}

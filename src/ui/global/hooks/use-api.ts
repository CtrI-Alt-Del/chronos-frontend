import { WorkScheduleService } from '@/api/services/work-schedule-service'
import { CLIENT_ENV } from '@/constants/client-env'
import { CollaborationService } from '@/api/services/collaboration-service'
import { useAuthContext } from '@/ui/auth/hooks/use-auth-context'
import { SolicitationService } from '@/api/services'
import { NextRestClient } from '@/api/next'
import { AuthService } from '@/api/services/auth-service'

const nextRestClient = NextRestClient({ isCacheEnabled: false })
nextRestClient.setBaseUrl(CLIENT_ENV.serverAppUrl)

export function useApi() {
  const { jwt } = useAuthContext()

  if (jwt) {
    nextRestClient.setHeader('Authorization', `Bearer ${jwt}`)
  }

  return {
    authService: AuthService(nextRestClient),
    workScheduleService: WorkScheduleService(nextRestClient),
    collaborationService: CollaborationService(nextRestClient),
    solicitationService: SolicitationService(nextRestClient),
  }
}

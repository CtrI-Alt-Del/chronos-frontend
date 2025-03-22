import { NextApiClient } from '@/api/next'
import { WorkScheduleService } from '@/api/services/work-schedule-service'
import { CLIENT_ENV } from '@/constants/client-env'
import { CollaboratorService } from '@/api/services/collaborator-service'

const nextApiClient = NextApiClient()

nextApiClient.setBaseUrl(CLIENT_ENV.serverAppUrl)

export function useApi() {
  return {
    workScheduleService: WorkScheduleService(nextApiClient),
    collaboratorService: CollaboratorService(nextApiClient),
  }
}

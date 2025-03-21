import { NextApiClient } from '@/api/next'
import { WorkScheduleService } from '@/api/services/work-schedule-service'
import { CLIENT_ENV } from '@/constants/client-env'

const nextApiClient = NextApiClient()
nextApiClient.setBaseUrl(CLIENT_ENV.serverAppUrl)

export function useApi() {
  return {
    workScheduleService: WorkScheduleService(nextApiClient),
  }
}

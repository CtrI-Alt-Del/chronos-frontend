import { NextApiClient } from '@/api/next'
import { CollaboratorService } from '@/api/services/collaborator-service'

const nextApiClient = NextApiClient()
nextApiClient.setBaseUrl('***')

export function useApi() {
  return {
    collaboratorService: CollaboratorService(nextApiClient),
  }
}

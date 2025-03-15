import { NextApiClient } from '@/src/api/next'

const nextApiClient = NextApiClient()
nextApiClient.setBaseUrl('***')

export function useApi() {
  return {}
}

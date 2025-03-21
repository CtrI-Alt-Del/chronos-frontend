import { NextApiClient } from '@/api/next'

const nextApiClient = NextApiClient()
nextApiClient.setBaseUrl('***')

export function useApi() {
  return {}
}

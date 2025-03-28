import { cookies } from 'next/headers'

import { COOKIES } from '@/@core/global/constants/cookies'
import { CLIENT_ENV } from '@/constants/client-env'
import { NextApiClient } from './next-api-client'
import type { CacheConfig } from '../types'

export const NextServerApiClient = async (cacheConfig?: CacheConfig) => {
  const apiClient = NextApiClient(cacheConfig)
  apiClient.setBaseUrl(CLIENT_ENV.serverAppUrl)

  const jwt = (await cookies()).get(COOKIES.jwt.key)?.value

  if (jwt) {
    apiClient.setHeader('Authorization', `Bearer ${jwt}`)
  }

  return apiClient
}

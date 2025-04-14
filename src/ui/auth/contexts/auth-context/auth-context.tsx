'use client'

import type { ReactNode } from 'react'
import { createContext } from 'react'
import { useAuthProvider } from './hooks/use-auth-provider'
import { AuthService } from '@/api/services/auth-service'
import { NextRestClient } from '@/api/next/clients/next-rest-client'
import { CLIENT_ENV } from '@/constants/client-env'
import { useAuthContext } from './hooks/use-auth-context'
import type { AuthContextValue } from './types'

const apiClient = NextRestClient({ isCacheEnabled: false })
apiClient.setBaseUrl(CLIENT_ENV.serverAppUrl)

type AuthContextProviderProps = {
  children: ReactNode
  jwt: string | null
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

function AuthContextProvider({ children, jwt }: AuthContextProviderProps) {
  if (jwt) apiClient.setHeader('Authorization', `Bearer ${jwt}`)
  const authService = AuthService(apiClient)
  const value = useAuthProvider({ authService, jwt })

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export { AuthContextProvider, AuthContext, useAuthContext }

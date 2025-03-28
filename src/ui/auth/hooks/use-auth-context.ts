import { useContext } from 'react'
import { AppError } from '@/@core/global/errors'
import { AuthContext } from '../contexts/auth-context/auth-context'
import type { AuthContextValue } from '../contexts/auth-context/types'

export function useAuthContext(): AuthContextValue {
  const context = useContext(AuthContext)

  if (!context) {
    throw new AppError(
      'AuthContext',
      'useAuthContext must be used within an AuthContextProvider',
    )
  }

  return context
}

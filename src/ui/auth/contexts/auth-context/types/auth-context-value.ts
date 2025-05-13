import type { AccountDto } from '@/@core/auth/dtos'

export type AuthContextValue = {
  account: AccountDto | null
  jwt: string | null
  isAuthenticated: boolean
  isAuthenticating: boolean
  isAdmin: boolean
  isManager: boolean
  isEmployee: boolean
  login: (otpCode: string) => Promise<void>
  logout: () => Promise<void>
}

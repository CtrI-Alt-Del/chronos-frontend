import type { AccountDto } from '@/@core/auth/dtos'

export type AuthContextValue = {
  account: AccountDto | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

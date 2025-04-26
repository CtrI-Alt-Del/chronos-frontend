import { useState } from 'react'
import { jwtDecode } from 'jwt-decode'

import { ROUTES } from '@/constants/routes'
import type { Jwt } from '@/server/auth/types/jwt'
import type { AccountDto } from '@/@core/auth/dtos'
import type { AuthService } from '@/@core/auth/interfaces/auth-service'
import { COOKIES } from '@/@core/global/constants/cookies'
import { useToast } from '@/ui/global/hooks/use-toast'
import { useCookieActions } from '@/ui/global/hooks/use-cookie-actions'
import { useNavigation } from '@/ui/global/hooks/use-navigation'

type UseAuthProviderProps = {
  authService: AuthService
  jwt?: string | null
}

export function useAuthProvider({ authService, jwt }: UseAuthProviderProps) {
  const accountDto = jwt ? JSON.parse(jwtDecode<Jwt>(jwt).sub) : null
  const [account, setAccount] = useState<AccountDto | null>(accountDto)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(Boolean(jwt))
  const toast = useToast()
  const navigation = useNavigation()
  const cookieActions = useCookieActions()

  async function login(email: string, password: string): Promise<void> {
    setIsLoading(true)

    const response = await authService.login(email, password)

    if (response.isFailure) {
      toast.showError(response.errorMessage)
    }

    if (response.isSuccess) {
      const jwt = jwtDecode<Jwt>(response.body.jwt)
      const accountDto = JSON.parse(jwt.sub)
      await cookieActions.setCookie({
        key: COOKIES.jwt.key,
        value: response.body.jwt,
        expirationInSeconds: COOKIES.jwt.duration,
      })
      setAccount(accountDto)
      setIsAuthenticated(true)
      toast.showSuccess('Login realizado com sucesso')
      navigation.goTo(getRouteByRole(accountDto.role))
    }

    setIsLoading(false)
  }

  async function logout() {
    setAccount(null)
    await cookieActions.deleteCookie(COOKIES.jwt.key)
    navigation.goTo(ROUTES.auth.login)
    navigation.reloadRoute()
  }

  function getRouteByRole(role: string) {
    let route = ''
    switch (role) {
      case 'admin':
        route = ROUTES.collaboration.collaborators
        break
      case 'manager':
        route = ROUTES.collaboration.collaborators
        break
      case 'employee':
        route = ROUTES.workSchedule.timePunch
        break
      default:
        route = ROUTES.workSchedule.timePunch
        break
    }
    return route
  }

  return {
    jwt: jwt ?? null,
    account,
    isAuthenticated,
    isLoading,
    isAdmin: account?.role.toLowerCase() === 'admin',
    isManager: account?.role.toLowerCase() === 'manager',
    isEmployee: account?.role.toLowerCase() === 'employee',
    login,
    logout,
  }
}

import { useState } from 'react'
import { jwtDecode } from 'jwt-decode'

import { ROUTES } from '@/constants/routes'
import { setCookie } from '@/server/set-cookie'
import type { Jwt } from '@/server/auth/types/jwt'
import type { AccountDto } from '@/@core/auth/dtos'
import type { IAuthService } from '@/@core/global/interfaces/auth-service'
import { COOKIES } from '@/@core/global/constants/cookies'
import { useToast } from '@/ui/global/hooks/use-toast'
import { useNavigation } from '@/ui/global/hooks'
import { deleteCookie } from '@/server/delete-cookie'

type UseAuthProviderProps = {
  authService: IAuthService
  jwt?: string | null
}

export function useAuthProvider({ authService, jwt }: UseAuthProviderProps) {
  const accountDto = jwt ? jwtDecode<AccountDto>(jwt) : null
  const [account, setAccount] = useState<AccountDto | null>(accountDto)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(Boolean(jwt))
  const toast = useToast()
  const navigation = useNavigation()

  async function login(email: string, password: string): Promise<void> {
    setIsLoading(true)

    const response = await authService.login(email, password)

    if (response.isFailure) {
      toast.showError(response.errorMessage)
    }

    if (response.isSuccess) {
      const jwt = jwtDecode<Jwt>(response.body.jwt)
      const accountDto = JSON.parse(jwt.sub)
      accountDto.collaboratorId = 'eecd9d4f-b86d-4838-b968-bbdc4d9b4ca6'
      await setCookie(COOKIES.jwt.key, response.body.jwt, COOKIES.jwt.duration)
      setAccount(accountDto)
      setIsAuthenticated(true)
      toast.showSuccess('Login realizado com sucesso')
      navigation.goTo(getRouteByRole(accountDto.role))
    }

    setIsLoading(false)
  }

  async function logout() {
    setAccount(null)
    await deleteCookie(COOKIES.jwt.key)
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
    account,
    isAuthenticated,
    isLoading,
    login,
    logout,
  }
}

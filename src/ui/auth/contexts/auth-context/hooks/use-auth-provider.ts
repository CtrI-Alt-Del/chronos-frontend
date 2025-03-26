import { useState } from 'react'
import { jwtDecode } from 'jwt-decode'

import type { AccountDto } from '@/@core/auth/dtos'
import type { IAuthService } from '@/@core/global/interfaces/auth-service'
import { setCookieAction } from '../../set-cookie-action'
import { COOKIES } from '@/@core/global/constants/cookies'
import { useToast } from '@/ui/global/hooks/use-toast'
import { useNavigation } from '@/ui/global/hooks'
import { ROUTES } from '@/@core/global/constants/routes'

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
      setCookieAction(COOKIES.jwt.key, response.body.jwt, COOKIES.jwt.duration)
      const accountDto = jwtDecode<AccountDto>(response.body.jwt)
      setAccount(accountDto)
      setIsAuthenticated(true)
      toast.showSuccess('Login realizado com sucesso')
      navigation.goTo(ROUTES.collaborators)
    }

    setIsLoading(false)
  }


  return {
    account,
    isAuthenticated,
    isLoading,
    login,
  }
}

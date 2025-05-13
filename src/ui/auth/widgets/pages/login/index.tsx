'use client'

import { useRest } from '@/ui/global/hooks/use-rest'
import { LoginPageView } from './login-page-view'

export const LoginPage = () => {
  const { authService } = useRest()

  return <LoginPageView authService={authService} />
}

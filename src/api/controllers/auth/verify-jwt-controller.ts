import { COOKIES } from '@/@core/global/constants/cookies'
import type { Controller } from '@/@core/global/interfaces/rest'
import type { Http } from '@/@core/global/interfaces/rest/http'
import { ROUTES } from '@/constants/routes'

const PUBLIC_ROUTES = [ROUTES.auth.login]

export const VerifyJwtMiddleware = (): Controller => {
  return {
    async handle(http: Http) {
      const currentRoute = http.getCurrentRoute()
      const isAuthenticated = await http.hasCookie(COOKIES.jwt.key)
      const isPublicRoute = PUBLIC_ROUTES.map(String).includes(currentRoute)
      const isLoginRoute = currentRoute === ROUTES.auth.login

      if (!isAuthenticated && !isPublicRoute) {
        return http.redirect(ROUTES.auth.login)
      }

      if (isAuthenticated && isLoginRoute) {
        return http.redirect(ROUTES.root)
      }

      return http.pass()
    },
  }
}

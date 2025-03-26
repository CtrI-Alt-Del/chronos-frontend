import type { IController } from "@/@core/global/interfaces/controller"
import type { IHttp } from "@/@core/global/interfaces/http"
import { ROUTES } from "@/constants/routes"

const PUBLIC_ROUTES = [
  ROUTES.auth.login,
]

export const VerifyJwtMiddleware = (): IController => {
  return {
    async handle(http: IHttp) {
      const currentRoute = http.getCurrentRoute()

      const isPublicRoute = PUBLIC_ROUTES.map(String).includes(currentRoute)

      if (!isPublicRoute) {
        return http.redirect(ROUTES.auth.login)
      }

      return http.pass()
    },
  }
}
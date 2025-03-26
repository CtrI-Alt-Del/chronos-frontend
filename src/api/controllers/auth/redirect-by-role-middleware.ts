import type { IController, IHttp } from "@/@core/global/interfaces"
import { ROUTES } from "@/constants/routes"

export const RedirectByRoleMiddleware = (): IController => {
  return {
    async handle(http: IHttp) {
      const currentRoute = http.getCurrentRoute()

      if (currentRoute === '/') {
        let route = ''
        const account = await http.getAccount()

        switch (account.role) {
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
        return http.redirect(route)
      }

      return http.pass()
    },
  }
}
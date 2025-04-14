import type { Call, CallServer } from '@/@core/global/interfaces'
import type { Role } from '@/@core/global/types'
import { ROUTES } from '@/constants'

type Request = Role[]

export const AllowPageByRolesAction = (): Call<Request> => {
  return {
    async handle(actionServer: CallServer<Request>) {
      const roles = actionServer.getRequest()
      const account = await actionServer.getAccount()

      if (!roles.includes(account.role as Role)) {
        actionServer.redirect(ROUTES.root)
      }
    },
  }
}

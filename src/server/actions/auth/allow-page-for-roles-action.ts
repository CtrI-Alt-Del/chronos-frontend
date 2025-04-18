import type { Action, Call } from '@/@core/global/interfaces/rpc'
import type { Role } from '@/@core/global/types'

type Request = Role[]

export const AllowPageForRolesAction = (): Action<Request> => {
  return {
    async handle(call: Call<Request>) {
      const roles = call.getRequest()
      const account = await call.getAccount()

      if (!roles.includes(account.role as Role)) {
        call.notFound()
      }
    },
  }
}

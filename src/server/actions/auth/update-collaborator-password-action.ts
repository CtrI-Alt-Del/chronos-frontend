import type { AuthService } from '@/@core/auth/interfaces'
import type { Action, Call } from '@/@core/global/interfaces/rpc'

type Request = {
  collaboratorId: string
  password: string
}

export const UpdateCollaboratorPasswordAction = (
  service: AuthService,
): Action<Request> => {
  return {
    async handle(call: Call<Request>) {
      const { collaboratorId, password } = call.getRequest()
      const response = await service.updateCollaboratorPassword(collaboratorId, password)
      if (response.isFailure) response.throwError()
    },
  }
}

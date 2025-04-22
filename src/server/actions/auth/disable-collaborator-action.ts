import { CACHE } from '@/@core/global/constants'
import type { AuthService } from '@/@core/auth/interfaces'
import type { Action, Call } from '@/@core/global/interfaces/rpc'

type Request = {
  collaboratorId: string
}

export const DisableCollaboratorAccountAction = (
  service: AuthService,
): Action<Request> => {
  return {
    async handle(actionServer: Call<Request>) {
      const { collaboratorId } = actionServer.getRequest()
      const response = await service.disableCollaboratorAccount(collaboratorId)
      if (response.isFailure) response.throwError()
      actionServer.resetCache(CACHE.collaboration.collaborator.key(collaboratorId))
    },
  }
}

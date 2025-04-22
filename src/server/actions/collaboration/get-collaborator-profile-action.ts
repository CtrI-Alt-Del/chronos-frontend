import type { CollaboratorDto } from '@/@core/collaboration/dtos'
import type { Action, Call } from '@/@core/global/interfaces/rpc'
import type { CollaborationService } from '@/@core/collaboration/interfaces'

type Response = {
  collaborator: CollaboratorDto | null
}

export const GetCollaboratorProfileAction = (
  service: CollaborationService,
): Action<void, Response> => {
  return {
    async handle(actionServer: Call<Request>) {
      const account = await actionServer.getAccount()
      if (!account.collaboratorId) {
        return {
          collaborator: null,
        }
      }

      const response = await service.getCollaborator(account.collaboratorId)
      if (response.isFailure) response.throwError()

      return {
        collaborator: response.body,
      }
    },
  }
}

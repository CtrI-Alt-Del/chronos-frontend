import type { CollaboratorDto } from '@/@core/collaboration/dtos'
import type { CollaborationService } from '@/@core/collaboration/interfaces'
import type { Action, Call } from '@/@core/global/interfaces/rpc'

type Request = {
  collaboratorId: string
}

type Response = {
  collaborator: CollaboratorDto
}

export const GetCollaboratorAction = (
  service: CollaborationService,
): Action<Request, Response> => {
  return {
    async handle(call: Call<Request>) {
      const { collaboratorId } = call.getRequest()
      const response = await service.getCollaborator(collaboratorId)
      if (response.isFailure) response.throwError()

      return {
        collaborator: response.body,
      }
    },
  }
}

import type { CollaboratorDto } from '@/@core/collaboration/dtos'
import type { IAction, IActionServer } from '@/@core/global/interfaces'
import type { ICollaborationService } from '@/@core/collaboration/interfaces'

type Request = {
  collaboratorId: string
}

type Response = {
  collaborator: CollaboratorDto
}

export const GetCollaboratorAction = (
  service: ICollaborationService,
): IAction<Request, Response> => {
  return {
    async handle(actionServer: IActionServer<Request>) {
      const { collaboratorId } = actionServer.getRequest()
      const response = await service.getCollaborator(collaboratorId)
      if (response.isFailure) response.throwError()

      return {
        collaborator: response.body,
      }
    },
  }
}

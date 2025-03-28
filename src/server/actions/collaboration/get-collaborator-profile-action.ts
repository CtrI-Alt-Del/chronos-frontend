import type { CollaboratorDto } from '@/@core/collaboration/dtos'
import type { IAction, IActionServer } from '@/@core/global/interfaces'
import type { ICollaborationService } from '@/@core/collaboration/interfaces'

type Response = {
  collaborator: CollaboratorDto
}

export const GetCollaboratorProfileAction = (
  service: ICollaborationService,
): IAction<void, Response> => {
  return {
    async handle(actionServer: IActionServer<Request>) {
      const account = await actionServer.getAccount()
      const response = await service.getCollaborator(account.collaboratorId)
      if (response.isFailure) response.throwError()

      return {
        collaborator: response.body,
      }
    },
  }
}

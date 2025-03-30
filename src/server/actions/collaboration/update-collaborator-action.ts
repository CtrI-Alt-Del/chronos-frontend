import { CACHE } from '@/@core/global/constants'
import type { CollaboratorDto } from '@/@core/collaboration/dtos'
import type { IAction } from '@/@core/global/interfaces/action'
import type { IActionServer } from '@/@core/global/interfaces/action-server'
import type { ICollaborationService } from '@/@core/collaboration/interfaces'

type Request = {
  collaboratorId: string
  collaboratorDto: CollaboratorDto
}

export const UpdateCollaboratorAction = (
  service: ICollaborationService,
): IAction<Request> => {
  return {
    async handle(actionServer: IActionServer<Request>) {
      const { collaboratorId, collaboratorDto } = actionServer.getRequest()
      const response = await service.updateCollaborator(collaboratorId, collaboratorDto)
      if (response.isFailure) response.throwError()
      actionServer.resetCache(CACHE.collaboration.collaborator.key(collaboratorId))
    },
  }
}

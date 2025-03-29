import { CACHE } from '@/@core/global/constants'
import type { IAction } from '@/@core/global/interfaces/action'
import type { IActionServer } from '@/@core/global/interfaces/action-server'
import type { ICollaborationService } from '@/@core/collaboration/interfaces'

type Request = {
  collaboratorId: string
}

export const DisableCollaboratorAction = (
  service: ICollaborationService,
): IAction<Request> => {
  return {
    async handle(actionServer: IActionServer<Request>) {
      const { collaboratorId } = actionServer.getRequest()
      const response = await service.enableCollaborator(collaboratorId)
      if (response.isFailure) response.throwError()
      actionServer.resetCache(CACHE.collaboration.collaborator.key(collaboratorId))
    },
  }
}

import { CACHE } from '@/@core/global/constants'
import type { CollaboratorDto } from '@/@core/collaboration/dtos'
import type { IAction } from '@/@core/global/interfaces/action'
import type { IActionServer } from '@/@core/global/interfaces/action-server'
import type { ICollaborationService } from '@/@core/collaboration/interfaces'

type Request = {
  collaboratorId: string
  collaboratorDto: Omit<CollaboratorDto, 'id'>
  workScheduleId: string
}

export const UpdateCollaboratorAction = (
  service: ICollaborationService,
): IAction<Request> => {
  return {
    async handle(actionServer: IActionServer<Request>) {
      const { collaboratorId, collaboratorDto, workScheduleId } =
        actionServer.getRequest()

      const collaborator = {
        id: collaboratorId,
        ...collaboratorDto,
      }
      const response = await service.updateCollaborator(collaborator, workScheduleId)
      if (response.isFailure) response.throwError()
      actionServer.resetCache(CACHE.collaboration.collaborator.key(collaboratorId))
    },
  }
}

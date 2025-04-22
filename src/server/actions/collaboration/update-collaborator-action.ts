import { CACHE } from '@/@core/global/constants'
import type { CollaboratorDto } from '@/@core/collaboration/dtos'
import type { CollaborationService } from '@/@core/collaboration/interfaces'
import type { Call, Action } from '@/@core/global/interfaces/rpc'

type Request = {
  collaboratorId: string
  collaboratorDto: CollaboratorDto
}

export const UpdateCollaboratorAction = (
  service: CollaborationService,
): Action<Request> => {
  return {
    async handle(call: Call<Request>) {
      const { collaboratorId, collaboratorDto } = call.getRequest()
      collaboratorDto.id = collaboratorId
      const response = await service.updateCollaborator(collaboratorDto)
      if (response.isFailure) response.throwError()

      call.resetCache(CACHE.collaboration.collaborator.key(collaboratorId))
    },
  }
}
